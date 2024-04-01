import { v4 as uuid } from 'uuid';

import { BenchmarkTableResult } from '../types';
import { BenchmarkSortingMap } from '../constants';

export const generateKey = () => `{RedisRacer}:${uuid()}`;

export function calculateAverageOpsPerSec(
  results: BenchmarkTableResult[]
): { library: string; avgOpsPerSec: number }[] {
  const nodeRedisResults = results.filter((result) =>
    result['Task Name'].startsWith('Node-Redis')
  );
  const ioredisResults = results.filter((result) =>
    result['Task Name'].startsWith('IORedis')
  );

  const average = (results: BenchmarkTableResult[]) => {
    const totalOps = results.reduce(
      (acc, { 'ops/sec': opsPerSec }) =>
        acc + parseInt(opsPerSec.replace(/,/g, ''), 10),
      0
    );
    return totalOps / results.length;
  };

  const nodeRedisAvg = average(nodeRedisResults);
  const ioredisAvg = average(ioredisResults);

  return [
    { library: 'Node-Redis', avgOpsPerSec: nodeRedisAvg },
    { library: 'IORedis', avgOpsPerSec: ioredisAvg },
  ];
}

export const findMostPerformant = (
  results: BenchmarkTableResult[]
): BenchmarkTableResult | null => {
  if (results.length === 0) return null;

  const parsedResults = results.map((result) => ({
    ...result,
    parsedOpsSec: parseInt(result['ops/sec'].replace(/,/g, ''), 10),
  }));

  const mostPerformant = parsedResults.reduce((max, result) => {
    return result.parsedOpsSec > max.parsedOpsSec ? result : max;
  });

  const { parsedOpsSec, ...originalResult } = mostPerformant;
  return originalResult;
};

export const sortResults = (benchmarks: BenchmarkTableResult[]) => {
  return benchmarks.sort(
    (a, b) =>
      BenchmarkSortingMap[a['Task Name'].split('#')[0]] -
      BenchmarkSortingMap[b['Task Name'].split('#')[0]]
  );
};
