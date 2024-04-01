import {
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisScripts,
} from 'redis';
import { Redis as RedisClient } from 'ioredis';

export declare type NodeRedisClient = RedisClientType<
  RedisDefaultModules,
  RedisFunctions,
  RedisScripts
>;
export declare type IORedisClient = RedisClient;

export type BenchmarkTableResult = {
  'Task Name': string;
  'ops/sec': string;
  'Average Time (ns)': number;
  Margin: string;
  Samples: number;
};
