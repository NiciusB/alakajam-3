<template>
  <div v-if="!cell.biome" class="cell" :style="{backgroundColor: '#004146'}"></div>
  <div v-else @click="cellClicked" class="cell" :style="{backgroundColor}">
    <div class="player" v-if="hasControlledPlayer">
      <img src="@/assets/guy.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: Object,
    cell: Object
  },
  computed: {
    backgroundColor() {
      return this.cell.biome.backgroundColor
    },
    hasControlledPlayer() {
      return this.cell.players.some(player => player === this.game.controlledPlayer)
    }
  },
  methods: {
    cellClicked() {
      if (!this.cell.biome) return false // Behind border: fake cell
      this.cell.movePlayer(this.game.controlledPlayer)
    }
  }
}
</script>

<style scoped lang="scss">
  .cell {
    position: relative;
    display: block;
    float: left;
    width: 33.333333333333333333%;
    height: 33.333333333333333333%;
    cursor: pointer;
    .player {
      img {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        max-height: 200px;
      }
    }
  }
</style>
