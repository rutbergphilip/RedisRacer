import { Bench } from 'tinybench';

import { IORedisInstance, NodeRedisInstance } from '../connection';
import { NodeRedisClient, IORedisClient, BenchmarkTableResult } from '../types';
import { findMostPerformant, generateKey } from '../helpers';
import { Config } from '../constants';

const suite = new Bench({
  time: Config.BENCHMARK_DURATION,
  warmupTime: Config.BENCHMARK_WARMUP_DURATION,
});

const multikeys = Array.from({ length: 1000 }).map(() => generateKey());

const benchmarkMultiOperation = async (
  client: NodeRedisClient | IORedisClient
) => {
  const multi = client.multi();
  // @ts-ignore
  multikeys.forEach((key) => multi.set(key, 'value'));
  await multi.exec();
};

suite
  .add(
    'Node-Redis#MULTI-GET',
    async () => {
      await benchmarkMultiOperation(NodeRedisInstance);
    },
    {
      afterAll: async () => {
        const multi = NodeRedisInstance.multi();
        multikeys.forEach((key) => multi.del(key));
        await multi.exec();
      },
    }
  )
  .add(
    'IORedis#MULTI-GET',
    async () => {
      await benchmarkMultiOperation(IORedisInstance);
    },
    {
      afterAll: async () => {
        const multi = IORedisInstance.multi();
        multikeys.forEach((key) => multi.del(key));
        await multi.exec();
      },
    }
  );

export async function runMultiBenchmark() {
  console.info('Warming up multi benchmark...');
  await suite.warmup();
  console.info('Warmup completed. Running multi benchmark...');
  await suite.run();

  const table = suite.table() as BenchmarkTableResult[];
  console.table(table);
  console.log(`Fastest is ${findMostPerformant(table)?.['Task Name']}`);

  return table;
}
