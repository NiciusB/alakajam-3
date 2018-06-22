<template>
  <div class="actions">
    <p>Action Points left: {{game.controlledPlayer.actionPoints}}</p>
    <p>Actions:</p>
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
  .actions {
    width: 560px;
    height: 360px;
    text-align: center;
  }
</style>
