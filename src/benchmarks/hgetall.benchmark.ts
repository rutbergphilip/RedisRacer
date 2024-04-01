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
  await client.hGetAll(key);
};

const benchmarkOperationIORedis = async (
  client: IORedisClient,
  key: string
) => {
  await client.hgetall(key);
};

suite
  .add(
    'Node-Redis#HGETALL',
    async () => {
      await benchmarkOperationNodeRedis(NodeRedisInstance, key);
    },
    {
      beforeAll: async () => {
        key = generateKey();
        await NodeRedisInstance.hSet(key, testData);
      },
      afterAll: async () => {
        await NodeRedisInstance.hDel(key, Object.keys(testData));
      },
    }
  )
  .add(
    'IORedis#HGETALL',
    async () => {
      await benchmarkOperationIORedis(IORedisInstance, key);
    },
    {
      beforeAll: async () => {
        key = generateKey();
        await IORedisInstance.hset(key, testData);
      },
      afterAll: async () => {
        await IORedisInstance.hdel(key, ...Object.keys(testData));
      },
    }
  );

export async function runHGetAllBenchmark() {
  console.info('Warming up hgetall benchmark...');
  await suite.warmup();
  console.info('Warmup completed. Running hgetall benchmark...');
  await suite.run();

  const table = suite.table() as BenchmarkTableResult[];
  console.table(table);
  console.log(`Fastest is ${findMostPerformant(table)?.['Task Name']}`);

  return table;
}
