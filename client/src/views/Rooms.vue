<template>
  <div>
    <div id="createRoom">
    <form @submit.prevent="createRoom" autocomplete="chrome-off">
        <label for="newRoom" class="h2">Create Room</label>
        <input
          type="text"
          class="form-control form-control-lg"
          name="roomname"
          id="roomname"
          v-model="roomname"
          required
        />
      <br>
      <button
        id="addRoom"
        class="btn btn-dark btn-lg"
        style="color:white"
      >Add New Room</button>
    </form>
    </div>

    <div class="mother">
        <div class="card" v-for="room in rooms" :key="room.id" @click="goToRooms(room.id)">
          <div class="card-body">
            <h3 class="card-title">{{room.name}}</h3>
            <br />
            <p class="card-text">Players : {{room.list_player.length}}</p>
            <br />
          </div>
        </div>
    </div>


        
  </div>
</template>

<style scoped>
  .mother {
    width: 70%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: red;
  }

  .card {
    cursor: pointer;
    width: 200px;
    margin: 15px;
  }

  .card:hover {
    background-color: #e0e0bd;
  }

  #createRoom {
    margin-bottom: 50px;
    background-color: blue;
  }

  form {
    padding: 50px;
    width: 60%;
    margin: 0 auto;
  }

</style>

<script>
import io from 'socket.io-client';
const baseUrl = 'http://localhost:3000';
const socket = io(baseUrl);

export default {
  data() {
    return {
      roomname: "",
    }
  },
  computed: {
        sockets(){
            return this.$store.state.socket
        },
        rooms(){
            return this.$store.state.rooms
        },
        availableRooms(){
          let available = this.rooms.filter(room => {
            return room.isPlay == false
          })
          return available
        }
    },
  created() {
    console.log(socket)
    socket.on("get-rooms", rooms => {
        console.log(rooms)
        this.$store.commit('SET_ROOMS',rooms)
    })
    this.getrooms()
  },
  methods: {
      getrooms(){
          socket.emit("get-rooms")
      },
      createRoom(){
          const data = 
          {
            name: this.roomname,
            list_player: [],
            admin: localStorage.nickname,
            genre: this.genre
          }
          socket.emit("create-room",data)
          this.roomname = ""
          this.genre = ""
      },
      goToRooms(id){
        this.$router.push(`/waiting/${id}`)
      }
  }
};
</script>

