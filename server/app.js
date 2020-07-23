const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = 3000
const cors = require('cors');


app.use(cors());
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
})

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})