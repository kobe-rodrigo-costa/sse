import { createClient, RedisClientType } from 'redis';

export class Redis {
    client: RedisClientType;
    constructor() {
        this.connect()
    }

    async connect() {
        this.client = createClient();

        this.client.on('error', err => console.log('Redis Client Error', err));

        await this.client.connect();
    }
}