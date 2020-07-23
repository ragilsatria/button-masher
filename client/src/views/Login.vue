<template>
  <div class="login">
    <div class="container box">
      <h1>Button Masher</h1>
      <form class="mt-5" @submit.prevent="createUser()">
        <input type="text" v-model="nickname" class="form-control">
        <button type="submit"></button>
      </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const baseUrl = 'http://localhost:3000';
export default {
  name: 'Login',
  data() {
    return {
      nickname: '',
    }
  },
  methods: {
    createUser() {
      localStorage.nickname = this.nickname;
      this.$store.commit('createUser' ,this.nickname);
    }
  },
  created() {
      const socket = io(baseUrl);
      this.$store.commit('SET_SOCKET', socket); 
  }
}
</script>

<style scoped>
  .login {
    height: 850px;
    background-color: #161c22;
    margin: 0 auto;
  }
  .box {
    padding-top: 200px;
  }
</style>