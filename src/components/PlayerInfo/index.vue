<template>
  <div class="info">
    <p>Turn: {{game.turn}}</p>
    <p>X: {{game.controlledPlayer.cell.x}}</p>
    <p>Y: {{game.controlledPlayer.cell.y}}</p>
    <p>Noise: {{game.controlledPlayer.noise}}</p>
    <p>Kill count: {{game.controlledPlayer.killCount}}</p>
    <p>Players remaining: {{game.players.length}}</p>
  </div>
</template>

<script>
export default {
  props: {
    game: Object
  }
}
</script>

<style scoped lang="scss">
  .info {
    float: right;
    width: 200px;
    height: 360px;
    text-align: center;
  }
</style>
