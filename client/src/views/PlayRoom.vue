<template>
  <div class="container mt-5" id="play">
    <h1 v-if='$store.state.timeout && $store.state.count > countOtherPlayer.count'>You Win!!!</h1>
    <h1 v-else-if='$store.state.timeout && $store.state.count < countOtherPlayer.count'>You Lose!!!</h1>
    <h1 v-else-if='$store.state.timeout && $store.state.count === countOtherPlayer.count'>Draw</h1>

    <h2 v-if='$store.state.timeout'>Your Score:</h2>
    <h1>{{ $store.state.count }}</h1>
    <div class="container mt-5">
      <button type="button" name="button" @click="addCount" v-if="!$store.state.disabled">Smash It!</button>
    </div>

    <div>
      <p>{{countOtherPlayer.player}}: {{countOtherPlayer.count}}</p>
    </div>
  </div>
</template>


<script>
import io from 'socket.io-client';
const baseUrl = 'http://localhost:3000';
const socket = io(baseUrl);


export default {
  data(){
    return {
      countOtherPlayer: {player: 'anonymous', count: 0}

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
        socket.emit(`timeOut`)
        this.$store.state.timeout = true
        this.$store.commit('STOP_COUNT')
      }, this.$store.state.timer);
    },
  },
  created() {
    const data = {
      roomId: this.$route.params.id,
      playerName: localStorage.nickname
    }
    socket.emit("join-room", data)
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Space') {
        this.$store.commit('ADD_COUNT');
      }
    });
    socket.on("broadcast-count", data => {
      this.countOtherPlayer = data
      console.log(data)
    })
  },
  mounted() {
  },
}
</script>

<style lang="css" scoped>
#play {
  background-color: coral;
}
</style>
