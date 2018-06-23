<template>
  <div class="map">
    <cell class="cell" v-for="cell in game.controlledPlayer.surroundingCells()" :key="`${cell.x}.${cell.y}`" :cell="cell" :game="game" />
  </div>
</template>

<script>
import Cell from './Cell'
export default {
  props: {
    game: Object
  },
  components: {
    Cell
  }
}
</script>

<style scoped lang="scss">
.map {
  width: 720px;
  height: 720px;
  user-select: none;
}
</style>
