import Redis from 'ioredis';

const redis = new Redis('redis://redis:6379');

redis.call('JSON.SET', 'test', '$', JSON.stringify({ foo: 'bar' }));
redis.call('JSON.GET', 'test').then((res) => {
  console.log(res);
});
