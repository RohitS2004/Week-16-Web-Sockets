import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Event handler
wss.on("connection", (socket) => {
    console.log("Client connected! on PORT: 8080")

    // on message event
    socket.on("message", (message) => {

        console.log(message.toString());

        // for each client in the web socket server
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client !== socket) {
                client.send(message.toString());
            }
        })
    })
})