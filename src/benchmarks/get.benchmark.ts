import { Bench } from 'tinybench';

import { IORedisInstance, NodeRedisInstance } from '../connection';
import { NodeRedisClient, IORedisClient, BenchmarkTableResult } from '../types';
import { findMostPerformant, generateKey } from '../helpers';
import { Config } from '../constants';

const suite = new Bench({
  time: Config.BENCHMARK_DURATION,
  warmupTime: Config.BENCHMARK_WARMUP_DURATION,
});

let key: string;

const benchmarkOperation = async (
  client: NodeRedisClient | IORedisClient,
  key: string
) => {
  await client.get(key);
};

suite
  .add(
    'Node-Redis#GET',
    async () => {
      await benchmarkOperation(NodeRedisInstance, key);
    },
    {
      beforeAll: async () => {
        key = `${generateKey()}:Node-Redis#GET`;
        await NodeRedisInstance.set(key, 'value');
      },
      afterAll: async () => {
        await NodeRedisInstance.del(key);
      },
    }
  )
  .add(
    'IORedis#GET',
    async () => {
      await benchmarkOperation(IORedisInstance, key);
    },
    {
      beforeAll: async () => {
        key = `${generateKey()}:IORedis#GET`;
        await IORedisInstance.set(key, 'value');
      },
      afterAll: async () => {
        await IORedisInstance.del(key);
      },
    }
  );

export async function runGetBenchmark() {
  console.info('Warming up get benchmark...');
  await suite.warmup();
  console.info('Warmup completed. Running get benchmark...');
  await suite.run();

  const table = suite.table() as BenchmarkTableResult[];
  console.table(table);
  console.log(`Fastest is ${findMostPerformant(table)?.['Task Name']}`);

  return table;
}
