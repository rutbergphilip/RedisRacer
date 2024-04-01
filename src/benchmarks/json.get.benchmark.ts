import { Bench } from 'tinybench';

import { IORedisInstance, NodeRedisInstance } from '../connection';
import { NodeRedisClient, IORedisClient, BenchmarkTableResult } from '../types';
import { findMostPerformant, generateKey } from '../helpers';
import { Config } from '../constants';

const suite = new Bench({ time: Config.BENCHMARK_DURATION });

let key: string;

const benchmarkOperationNodeRedis = async (
  client: NodeRedisClient,
  key: string
) => {
  await client.json.get(key);
};

const benchmarkOperationIORedis = async (
  client: IORedisClient,
  key: string
) => {
  await client.call('JSON.GET', key, '$');
};

suite
  .add(
    'Node-Redis#JSON.GET',
    async () => {
      await benchmarkOperationNodeRedis(NodeRedisInstance, key);
    },
    {
      beforeAll: async () => {
        key = generateKey();
        await NodeRedisInstance.json.set(key, '$', {
          key: 'value',
        });
      },
      afterAll: async () => {
        await NodeRedisInstance.json.del(key);
      },
    }
  )
  .add(
    'IORedis#JSON.GET',
    async () => {
      await benchmarkOperationIORedis(IORedisInstance, key);
    },
    {
      beforeAll: async () => {
        key = generateKey();
        await IORedisInstance.call(
          'JSON.SET',
          key,
          '$',
          JSON.stringify({ key: 'value' })
        );
      },
      afterAll: async () => {
        await IORedisInstance.call('JSON.DEL', key);
      },
    }
  );

export async function runJSONGetBenchmark() {
  console.info('Warming up JSON.GET benchmark...');
  await suite.warmup();
  console.info('Warmup completed. Running JSON.GET benchmark...');
  await suite.run();

  const table = suite.table() as BenchmarkTableResult[];
  console.table(table);
  console.log(`Fastest is ${findMostPerformant(table)?.['Task Name']}`);

  return table;
}
