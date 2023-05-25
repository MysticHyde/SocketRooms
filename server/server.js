const express = require('express');
const app = express();
const http = require('http');
const port = 3001
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
   
        origin: `http://localhost:3000`,
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
console.log(`Nouvelle connexion (${socket.id})`)
})

server.listen(port, () => {
    console.log('SERVER IS RUNNING')
    console.log(`http://localhost:${port}`)
})
