import { Request, Response } from "express";

export class Events {
    eventsHandler(request: Request, response: Response, clients: any[]) {
        const { id } = request.params
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };
        response.writeHead(200, headers);
        
        const exist = clients.find((item) => item.id === id)
        if (!exist) {
            const newClient = {
                id: id,
                response
            };

            clients.push(newClient);
        }

        request.on('close', () => {
            console.log(`${id} Connection closed`);
            clients = clients.filter(client => client.id !== id);
        });
    }


    status(msg: string, clients: any[]) {
        if (msg) {
            const { id, response } = JSON.parse(msg)
            if (clients.length > 0) {
                const client = clients.find(client => client.id === id)
                console.log(client)
                if (client) {
                    client.response.write(`data: ${JSON.stringify(response)}\n\n`)
                }
            }
        }
    }
}
