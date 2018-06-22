<template>
  <div class="map">
    <cell class="cell" v-for="cell in surroundingCells" :key="`${cell.x}.${cell.y}`" :cell="cell" :game="game" />
  </div>
</template>

<script>
import Cell from './Cell'
export default {
  props: {
    game: Object
  },
  computed: {
    surroundingCells() {
      if (!this.game.controlledPlayer.cell) return []

      var surroundingCells = []
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          surroundingCells.push(this.game.map.cell(x + this.game.controlledPlayer.cell.x, y + this.game.controlledPlayer.cell.y))
        }
      }
      return surroundingCells
    }
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
