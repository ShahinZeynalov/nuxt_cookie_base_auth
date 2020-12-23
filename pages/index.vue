<template>
  <div class="board">
    
  <div class="window">
    <h1>🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳<br>Conguratulations<br> 🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳</h1>
  </div>
  </div>
</template>

<script>

export default {
  middleware: ['auth'],
  data() {
    return {
    }
  },
  async mounted() {
  },
  methods: {

  },
}
</script>

<style >
.board {
  background-color: #ffffff;
  height:91.6vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: fantasy;
  text-transform: lowercase;
  color: rgb(255, 255, 255);

  
}
.window {
  background-color: teal;
  padding: 50px;
  border-radius: 10px;
}

</style>
