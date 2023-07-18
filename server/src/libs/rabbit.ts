import { Channel, Connection, ConsumeMessage } from 'amqplib';
import { connect } from 'amqplib'
export class Rabbit {
    connectionInstance: Connection
    channelInstance: Channel
    
    async connectInstance() {
        try {
            this.connectionInstance = await connect('amqp://localhost');
            this.channelInstance = await this.connectionInstance.createChannel()
        } catch (error) {
            console.log(error)
        }
    }

    async connectConsumerQueue(queue: string) {
        if(this.channelInstance) {
            await this.channelInstance.assertQueue(queue)
        }
    }


    consumer(msg: ConsumeMessage) {
        console.log(msg.content.toString())
        this.channelInstance.ack(msg)
        return msg.content.toString()
    }

}