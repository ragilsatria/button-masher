const express = require('express')
const app = express()
const cors = require("cors")
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = 3000
const cors = require('cors');

app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

let rooms = [
    {
        id: 1,
        name: "VS",
        list_player: [],
        admin: "Bujang",
        genre: "7644900062"
    },
    {
        id: 2,
        name: "co-op",
        list_player: [],
        admin: "Bujang",
        genre: "7644761062"
    }
]

io.on('connection', (socket) => {
    console.log("User Connected")
    socket.on("get-rooms", () => {
        io.emit("get-rooms", rooms)
    })
    socket.on("create-room",data => {
         data.id = rooms.length + 1
        rooms.push(data)
        io.emit("get-rooms", rooms)
    })
    socket.on("join-room", data => {
        console.log(data)
        socket.join(`room${data.roomId}`,() => {
            console.log(socket.rooms)
            const index = rooms.findIndex(i => i.id == data.roomId)
            if(!rooms.includes(data.playerName)){
                rooms[index].list_player.push(data.playerName)
            }
            io.emit("get-rooms", rooms)
        })
    })
})

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})