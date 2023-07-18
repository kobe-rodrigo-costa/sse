import cors from "cors";
import express from "express";
import helmet from "helmet";
import * as bodyParser from "body-parser"
import * as dotenv from 'dotenv'
import { Rabbit } from './libs/rabbit'
import { routes } from "./router/routes";
import { Events } from "./controller/events";

dotenv.config()


class App {
    clients: any[] = [];
    server = express();

    constructor() {
        this.middlewares();
        this.routes();
        this.connectRabbit();
    }

    routes() {
        this.server.use("/api/v1", routes);
    }

    async connectRabbit() {
        const rabbitInstance = new Rabbit();
        const eventService = new Events();
        await rabbitInstance.connectInstance();
        await rabbitInstance.connectConsumerQueue("events")
        if (rabbitInstance.channelInstance) {
            rabbitInstance.channelInstance.consume("events", (message) => {
                if (message) {
                    const msgResponse = rabbitInstance.consumer(message);
                    eventService.status(msgResponse, this.clients)
                }
            })
        }
    }

    middlewares() {
        this.server.use(
            cors({
                origin: '*',
            })
        );
        this.server.use(helmet());
        this.server.use(bodyParser.json({ limit: '100mb' }));
        this.server.use(bodyParser.text({ limit: '100mb' }));
        this.server.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    }
}

export default new App();
