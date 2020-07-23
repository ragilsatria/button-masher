<template>
  <div class="login">
    <div class="container box">
      <p>Button Masher</p>
      <form @submit.prevent="createUser()">
        <input type="text" v-model="nickname" class="form-control" placeholder="Enter Nickname" />
        <button class="btn btn-danger" type="submit">Confirm</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const baseUrl = 'http://localhost:3000';

export default {
  name: "Login",
  data() {
    return {
      nickname: ""
    };
  },
  methods: {
    createUser() {
      localStorage.nickname = this.nickname;
      socket.emit("chat message", this.nickname);
      this.$store.commit("createUser", this.nickname);
    }
  },
  created() {
      const socket = io(baseUrl);
      this.$store.commit('SET_SOCKET', socket); 
  }
}

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bungee&display=swap");

.login {
  height: 780px;
  background-size: cover;
  background-color: #161c22;
  margin: 0 auto;
}

.box {
  padding-top: 140px;
  width: 500px;
}

.login p {
  color: #fff;
  font-size: 70px;
  font-family: "Bungee", cursive;
}

button {
  width: 87px;
  height: 47px;
  border-radius: 34px;
  color: rgb(255, 255, 255);
  opacity: 0.9;
}

form {
  width: 450px;
  margin: 50px 0;
  display: grid;
  place-items: center;
}
form input {
  width: 150px;
  margin-bottom: 40px;
}
</style>