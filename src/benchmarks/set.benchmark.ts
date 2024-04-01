import { Bench } from 'tinybench';

import { IORedisInstance, NodeRedisInstance } from '../connection';
import { NodeRedisClient, IORedisClient, BenchmarkTableResult } from '../types';
import { findMostPerformant, generateKey } from '../helpers';
import { Config } from '../constants';

const suite = new Bench({ time: Config.BENCHMARK_DURATION });

let key: string;

const benchmarkOperation = async (
  client: NodeRedisClient | IORedisClient,
  key: string
) => {
  await client.set(key, 'value');
};

suite
  .add(
    'Node-Redis#SET',
    async () => {
      await benchmarkOperation(NodeRedisInstance, key);
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
    'IORedis#SET',
    async () => {
      await benchmarkOperation(IORedisInstance, key);
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

export async function runSetBenchmark() {
  console.info('Warming up set benchmark...');
  await suite.warmup();
  console.info('Warmup completed. Running set benchmark...');
  await suite.run();

  const table = suite.table() as BenchmarkTableResult[];
  console.table(table);
  console.log(`Fastest is ${findMostPerformant(table)?.['Task Name']}`);

  return table;
}
