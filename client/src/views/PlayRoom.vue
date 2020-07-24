<template>
  <div id="play">
    <h1 v-if='$store.state.timeout && $store.state.count > countOtherPlayer.count'>You Win!!!</h1>
    <h1 v-else-if='$store.state.timeout && $store.state.count < countOtherPlayer.count'>You Lose!!!</h1>
    <h1 v-else-if='$store.state.timeout && $store.state.count === countOtherPlayer.count'>Draw</h1>

    <div class="mother">
      
      <div class="boks">
        <h2 v-if='$store.state.timeout'>Your Score:</h2>
        <h1 class="score">{{ $store.state.count }}</h1>
      </div>

      <div class="boks">
        <button class="btn btn-danger" type="button" name="button" @click="addCount" v-if="!$store.state.disabled">Smash It!</button>
      </div>

    </div>

    <div class="scoreBoard">
      <h2>{{countOtherPlayer.player}}: {{countOtherPlayer.count}}</h2>
    </div>

    <!-- <div>
      <button v-if="$store.state.timeout" @click="backToRoom" class="btn btn-primary">Back to select room</button>
    </div> -->
  </div>
</template>


<script>
import io from 'socket.io-client';
const baseUrl = 'http://localhost:3000';
const socket = io(baseUrl);


export default {
  data(){
    return {
      countOtherPlayer: {player: 'Opponent', count: 0}

    }
  },
  methods: {
    addCount() {
      this.$store.commit('ADD_COUNT')
      socket.emit('add-count', {count: this.$store.state.count, player: localStorage.nickname, room: `room${this.$route.params.id}`})
      this.startTimer()
      
    },
    startTimer() {
      setTimeout(() => {
        this.$store.state.timeout = true
        socket.emit(`timeOut`)
        this.$store.commit('STOP_COUNT')
      }, this.$store.state.timer);
    },
    backToRoom() {
      this.$router.push('/rooms')
    }
    
  },
  created() {
    const data = {
      roomId: this.$route.params.id,
      playerName: localStorage.nickname
    }
    // socket.emit("join-room", data)
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Space') {
        this.$store.commit('ADD_COUNT');
      }
    });
    socket.on("broadcast-count", data => {
      console.log(data, "<<< data nih woi");
      this.countOtherPlayer = data
    })
    socket.on('timeOutNow', data=>{
      this.$store.state.timeout = true
      this.$store.commit('STOP_COUNT')
    }) 
  },
  mounted() {
  },
}
</script>

<style scoped>

  #play {
    background-color: coral;
    height: 100vh;
  }

  .mother {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .score {
    padding-top: 60px;
    font-size: 300px;
  }

  .scoreBoard {
    margin: 10px
  }

  .btn {
    margin: 150px auto;
    height: 300px;
    width: 300px;
    font-size: 60px;
  }

  .boks {
    border: 1px black solid;
    margin: 0 auto;
    height: 600px;
    width: 600px;
  }
</style>
