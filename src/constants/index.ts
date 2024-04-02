export const Config = Object.freeze({
  BENCHMARK_DURATION: 5000, // Time in milliseconds
  REDIS_URL: 'redis://127.0.0.1:6379',
});

export const BenchmarkSortingMap = Object.freeze({
  'Node-Redis': 0,
  IORedis: 1,
});
