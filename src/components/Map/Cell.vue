<template>
  <div v-if="!cell.biome" class="cell" :style="{backgroundColor: '#004146'}"></div>
  <div v-else @click="cellClicked" class="cell" :style="{backgroundColor}">
    <div class="badguys">
      <div v-for="player in enemies" :key="player.id" >
        <span>{{player.health}}</span>
        <br/>
        <span>{{player.name}}</span>
        <img src="@/assets/badguy.png" />
      </div>
    </div>
    <div class="loot">
      <div v-for="(loot, index) in cell.loot" :key="index" >
        <img src="@/assets/loot.png" />
      </div>
    </div>
    <div class="player" v-if="hasControlledPlayer">
      <img src="@/assets/guy.png" />
    </div>
  </div>
</template>

<script>
import actions from '@/game/actions'

export default {
  props: {
    game: Object,
    cell: Object
  },
  computed: {
    backgroundColor() {
      return this.cell.biome.backgroundColor
    },
    enemies() {
      return this.cell.players.filter(player => player !== this.game.controlledPlayer)
    },
    hasControlledPlayer() {
      return this.cell.players.some(player => player === this.game.controlledPlayer)
    }
  },
  methods: {
    cellClicked() {
      if (!this.cell.biome) return false // Behind border: fake cell
      if (this.cell === this.game.controlledPlayer.cell) return false
      if (!actions.Move.use(this.game.controlledPlayer, {x: this.cell.x, y: this.cell.y})) {
        alert('Not enough action points')
      }
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
    .badguys {
      position: absolute;
      top: 10%;
      width: 100%;
      text-align: center;
      >div {
        margin: 0 5px;
        display: inline-block;
        img {
          max-height: 30px;
          display: block;
          margin: auto;
          margin-top: 5px;
        }
      }
    }
    .player {
      img {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        max-height: 50px;
      }
    }
    .loot {
      position: absolute;
      bottom: 10%;
      width: 100%;
      text-align: center;
      >div {
        margin: 0 5px;
        display: inline-block;
        img {
          max-height: 20px;
          display: block;
          margin: auto;
          margin-top: 5px;
        }
      }
    }
  }
</style>
