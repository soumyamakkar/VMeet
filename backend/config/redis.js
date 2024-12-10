const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: 'redis-11537.c62.us-east-1-4.ec2.redns.redis-cloud.com',
        port: '11537'
    },
    password: 'VqMBtqpACPcdcCozEw7A4hTAbZOdTCms',
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('connect', () => console.log('Connected to Redis Cloud.'));

module.exports = redisClient;
