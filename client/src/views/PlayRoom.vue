<template>
  <div>
    <h1>{{ $store.state.count }}</h1>
    <button type="button" name="button" @click="addCount" >Smash It!</button>
  </div>
</template>


<script>
export default {
  methods: {
    addCount1() {
      this.$store.commit('ADD_COUNT')
    },
    addCount() {
      this.$store.commit('ADD_COUNT')
    },
  },
  created() {
  },
  mounted() {
  },
}
</script>

<style lang="css" scoped>
</style>
