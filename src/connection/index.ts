import IORedis from 'ioredis';
import { createClient } from 'redis';

import { IORedisClient, NodeRedisClient } from '../types';
import { Config } from '../constants';

export let IORedisInstance: IORedisClient;
export let NodeRedisInstance: NodeRedisClient;

export default async function connect() {
  IORedisInstance = new IORedis(Config.REDIS_URL);

  await new Promise<void>((resolve) => {
    IORedisInstance.on('ready', () => {
      console.log('IORedis is ready');
      resolve();
    });
    IORedisInstance.on('error', (err) => console.error(err));
  });

  NodeRedisInstance = await createClient({
    url: Config.REDIS_URL,
  })
    .on('connect', () => console.log('NodeRedis is ready'))
    .on('error', (err) => console.error(err))
    .connect();

  if (!isReady()) {
    throw new Error('Connection to Redis failed');
  }
}

function isReady() {
  return IORedisInstance.status === 'ready' && NodeRedisInstance.isReady;
}
