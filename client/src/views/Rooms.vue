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

    <div class="mother" v-if="this.rooms.length > 0">
      <Room v-for="room in rooms" :key="room.id" :room="room"></Room>
    </div>        
  </div>
</template>

<style scoped>
  .mother {
    width: 70%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /* background-color: red; */
  }

  .card {
    width: 200px;
    margin: 15px;
    box-shadow: 1px 1px 3px black;
  }

  #createRoom {
    color: white;
    margin-bottom: 50px;
    background-color: blue;
    box-shadow: 0px 2px 10px black;
  }

  form {
    padding: 50px;
    width: 60%;
    margin: 0 auto;
  }

  form > label {
    font-weight: 600;
    text-shadow: 1px 1px 1px black;
    padding-bottom: 20px;
  }

  input {
    text-align: center;
  }

</style>

<script>
import Room from '../components/Room.vue';
import io from 'socket.io-client';
const baseUrl = 'http://localhost:3000';
const socket = io(baseUrl);

export default {
  components: {
    Room
  },
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
            console.log(this.$store.state.rooms, "<<< room ini")
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
  }
};
</script>

