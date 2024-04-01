import connect from './connection';
import benchmarks from './benchmarks';

import * as dotenv from 'dotenv';
import { BenchmarkTableResult } from './types';
import { calculateAverageOpsPerSec, sortResults } from './helpers';
dotenv.config();

async function main() {
  await connect();

  const results: BenchmarkTableResult[] = [];
  for (const benchmark of benchmarks) {
    const result = await benchmark();
    results.push(...result);
  }

  const sorted = sortResults(results);
  console.info('Benchmark results:');
  console.table(sorted);

  const avgOpsPerSec = calculateAverageOpsPerSec(sorted);
  console.info('Average ops/sec:');
  console.table(avgOpsPerSec);

  const maxOpsPerSec = avgOpsPerSec.reduce((max, result) => {
    return result.avgOpsPerSec > max.avgOpsPerSec ? result : max;
  });
  console.info('Most performant:');
  console.table(maxOpsPerSec);
}

main().catch(console.error);
