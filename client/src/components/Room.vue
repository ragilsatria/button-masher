<template>
  <div class="card" @click="goToRooms(room)">
    <div class="card-body">
      <h3 class="card-title">{{room.name}}</h3>
      <br />
      <p class="card-text">Players : {{room.list_player.length}}</p>
      <br/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['room'],
  methods: {
    goToRooms(room) {
      console.log(room);
      if (room.list_player.length <= 2) {
        this.$router.push(`/waiting/${room.id}`);
      } else {
        console.log(`room penuh`);
      }
      // socket.emit('join-room', {roomId: id, playerName: localStorage.nickname})
    }
  },
};
</script>

<style scoped>
  .card {
    cursor: pointer;
    width: 200px;
    margin: 15px;
  }

  .card:hover {
    background-color: #e0e0bd;
  }
</style>