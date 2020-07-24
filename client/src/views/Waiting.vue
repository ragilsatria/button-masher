<template>
  <div>
   <!-- <div class="header">
      <img alt="mic logo" src="../assets/waiting.png" width="75" />
      <br />
      <br />
      <h1 class="display-3" style="color:white">Be Ready</h1>
    </div>
    <br />
    <img alt="Play" src="../assets/run.png" width="200" @click="playSong" />

    <div>
      <div class="wrapper">
          <br />
          <h1 class="display-3" style="color:white">Players:</h1>
          <div class="column">
            <div class="row d-flex justify-content-between  mx-5">
              <div class="card" style="width: 18rem;" v-for="(player,index) in curentRoom.list_player" :key="index">
                <div class="card-body">
                  <h5 class="card-title">Players {{index + 1 }}</h5>
                  <p class="card-text">{{player}}</p>
                </div>
              </div>
            </div>
          </div>

          <h1 style="color:black">---</h1>
          <br />

        

      </div>
    </div> -->

    <div class="instruction">
      <h1>Hint: Click Click Click..</h1>
    </div>
    
    <div>
      <div class="mother">
        <div class="card" v-for="(player,index) in curentRoom.list_player" :key="index">
          <div class="card-body">
            <!-- <h5 class="card-title">Players {{index + 1 }}</h5> -->
            <p class="card-text">Players {{index + 1 }} <br> {{player}}</p>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-lg" style="color:white" v-if="curentRoom.admin == nickname" @click="goToPlay">Start</button>
      <button class="btn btn-primary btn-lg" style="color:white"  @click.prevent="backToRoom">Back</button>
    </div>

  </div>
</template>

<style scoped>
  .instruction {
    padding-top: 20px;
    text-shadow: 1px 1px 1px black;
    height: 100px;
    width: 100%;
    background-color: blue;
    color: white;
  }

  .mother {
    margin: 50px auto;
    /* background-color: red; */
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .card {
    box-shadow: 1px 1px 3px black;
    margin: 20px auto;
    height: 400px;
    width: 400px;
  }

  .card-text {
    font-size: 30px;
    padding-top: 126px;
  }

  .btn {
    width: 150px;
    margin: 0px 20px;
  }
  
</style>

<script>
// @ is an alias to /src
// import socket from "@/config/socket";
import io from 'socket.io-client';
const baseUrl = 'http://localhost:3000';
const socket = io(baseUrl)

export default {
  name: "Play",
  components: {},
  data() {
    return {
      nickname: ""
    };
  },
  methods: {
    goToPlay() {
      socket.emit("goToPlay", this.$route.params.id)
      this.$router.push(`/playroom/${this.$route.params.id}`)
    },
    backToRoom() {
      this.$router.push('/rooms')
    }
  },
  created() {
    this.nickname = localStorage.nickname
    socket.on("go-to-play",() => {
      this.$router.push(`/playroom/${this.$route.params.id}`)
    })
    const data = {
      roomId: this.$route.params.id,
      playerName: localStorage.nickname
    }
    socket.emit("join-room", data)
    console.log(this.curentRoom)
  },
  computed: {
        sockets(){
            return this.$store.state.socket
        },
        rooms(){
            return this.$store.state.rooms
        },
        curentRoom(){
          const index = this.rooms.findIndex(i => i.id == this.$route.params.id)
          return this.rooms[index]
        }
    }
};
</script>
