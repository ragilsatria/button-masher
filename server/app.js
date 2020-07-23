const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = 3000

io.on('connection', (socket) => {

})

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})