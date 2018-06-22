<template>
  <div :class="classNames" :style="style">

  </div>
</template>

<script>
export default {
  props: {
    game: Object,
    cell: Object
  },
  computed: {
    classNames() {
      var classNames = {}
      classNames.cell = true
      classNames.player = this.cell.players.some(player => player === this.game.controlledPlayer)
      return classNames
    },
    style() {
      var style = {}
      style.backgroundColor = this.cell.biome.backgroundColor
      return style
    }
  }
}
</script>

<style scoped lang="scss">
  .cell {
    display: block;
    float: left;
    width: 5%;
    height: 5%;
    &.player::after {
      content: " ";
      display: block;
      background: #4400ff;
      margin: 25%;
      width: 50%;
      height: 50%;
      border-radius: 50%;
    }
  }
</style>
