<template>
  <div class="minimap">
    <cell class="cell" v-for="cell in game.map.cells" :key="`${cell.x}.${cell.y}`" :cell="cell" :game="game" />
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
.minimap {
  width: 360px;
  height: 360px;
  user-select: none;
  float: left;
}
</style>
