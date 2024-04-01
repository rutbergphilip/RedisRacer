import { Bench } from 'tinybench';

import { IORedisInstance, NodeRedisInstance } from '../connection';
import { NodeRedisClient, IORedisClient, BenchmarkTableResult } from '../types';
import { findMostPerformant, generateKey } from '../helpers';
import { Config } from '../constants';

const suite = new Bench({ time: Config.BENCHMARK_DURATION });

let key: string;
const testData = {
  field1: 'value1',
  field2: 'value2',
};

const benchmarkOperationNodeRedis = async (
  client: NodeRedisClient,
  key: string
) => {
  await client.hSet(key, testData);
};

const benchmarkOperationIORedis = async (
  client: IORedisClient,
  key: string
) => {
  await client.hset(key, testData);
};

suite
  .add(
    'Node-Redis#HSET',
    async () => {
      await benchmarkOperationNodeRedis(NodeRedisInstance, key);
    },
    {
      beforeEach: async () => {
        key = generateKey();
      },
      afterEach: async () => {
        await NodeRedisInstance.del(key);
      },
    }
  )
  .add(
    'IORedis#HSET',
    async () => {
      await benchmarkOperationIORedis(IORedisInstance, key);
    },
    {
      beforeEach: async () => {
        key = generateKey();
      },
      afterEach: async () => {
        await IORedisInstance.del(key);
      },
    }
  );

export async function runHSetBenchmark() {
  console.info('Warming up hset benchmark...');
  await suite.warmup();
  console.info('Warmup completed. Running hset benchmark...');
  await suite.run();

  const table = suite.table() as BenchmarkTableResult[];
  console.table(table);
  console.log(`Fastest is ${findMostPerformant(table)?.['Task Name']}`);

  return table;
}
