import { runGetBenchmark } from './get.benchmark';
import { runSetBenchmark } from './set.benchmark';
import { runHGetAllBenchmark } from './hgetall.benchmark';
import { runHSetBenchmark } from './hset.benchmark';
import { runJSONGetBenchmark } from './json.get.benchmark';
import { runJSONSetBenchmark } from './json.set.benchmark';
import { runMultiBenchmark } from './multi.benchmark';

export default [
  runGetBenchmark,
  runSetBenchmark,
  runHSetBenchmark,
  runHGetAllBenchmark,
  runJSONGetBenchmark,
  runJSONSetBenchmark,
  runMultiBenchmark,
];
