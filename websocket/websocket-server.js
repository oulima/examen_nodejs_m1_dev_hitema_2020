const WebSocket = require('ws')
const webSocketServer = new WebSocket.Server({ port: 3003 });
const mess = []; 

webSocketServer.on('connection', webSocket => {
    webSocket.onmessage = messageEvent => {
        const message = messageEvent.data;
        mess.push(message);

        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(mess));
            }
        });
    };
    webSocket.send(JSON.stringify(mess));
});

module.exports = webSocketServer;
