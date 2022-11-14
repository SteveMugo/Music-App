import { createClient } from 'redis';

const redisURL = `redis://localhost:6379`;
const redisClient = createClient({
    url: redisURL,
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Music API - Redis Client connected successfully....');
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectRedis, 5000);
    }
};

connectRedis();

// redisClient.on('error', (error) => console.log(error));

export default redisClient;