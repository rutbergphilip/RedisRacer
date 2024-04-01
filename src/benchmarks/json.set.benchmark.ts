import { Bench } from 'tinybench';

import { IORedisInstance, NodeRedisInstance } from '../connection';
import { NodeRedisClient, IORedisClient, BenchmarkTableResult } from '../types';
import { findMostPerformant, generateKey } from '../helpers';
import { Config } from '../constants';

const suite = new Bench({ time: Config.BENCHMARK_DURATION });

let key: string;
const testData = {
  key: 'value',
};

const benchmarkOperationNodeRedis = async (
  client: NodeRedisClient,
  key: string
) => {
  await client.json.set(key, '$', testData);
};

const benchmarkOperationIORedis = async (
  client: IORedisClient,
  key: string
) => {
  await client.call('JSON.SET', key, '$', JSON.stringify(testData));
};

suite
  .add(
    'Node-Redis#JSON.SET',
    async () => {
      await benchmarkOperationNodeRedis(NodeRedisInstance, key);
    },
    {
      beforeEach: async () => {
        key = generateKey();
      },
      afterEach: async () => {
        await NodeRedisInstance.json.del(key);
      },
    }
  )
  .add(
    'IORedis#JSON.SET',
    async () => {
      await benchmarkOperationIORedis(IORedisInstance, key);
    },
    {
      beforeEach: async () => {
        key = generateKey();
      },
      afterEach: async () => {
        await IORedisInstance.call('JSON.DEL', key);
      },
    }
  );

export async function runJSONSetBenchmark() {
  console.info('Warming up JSON.SET benchmark...');
  await suite.warmup();
  console.info('Warmup completed. Running JSON.SET benchmark...');
  try {
    await suite.run();
  } catch (error) {
    console.error(error);
  }

  const table = suite.table() as BenchmarkTableResult[];
  console.table(table);
  console.log(`Fastest is ${findMostPerformant(table)?.['Task Name']}`);

  return table;
}
