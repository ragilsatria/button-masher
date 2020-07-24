<template>
  <div class="container mt-5" id="play">
    <h1 v-if='$store.state.timeout'>You Win!!!</h1>
    <h2 v-if='$store.state.timeout'>Your Score:</h2>
    <h1>{{ $store.state.count }}</h1>
    <div class="container mt-5">
      <button type="button" name="button" @click="addCount" v-if="!$store.state.disabled">Smash It!</button>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    addCount() {
      this.$store.commit('ADD_COUNT')
      this.startTimer()
    },
    startTimer() {
      setTimeout(() => {
      this.$store.state.timeout = true
      console.log(this.$store.state.timeout, "ini timeout")
      this.$store.commit('STOP_COUNT')
      }, this.$store.state.timer);
    },
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Space') {
        this.$store.commit('ADD_COUNT');
      }
    });
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
