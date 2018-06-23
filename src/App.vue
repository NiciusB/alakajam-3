<template>
  <div id="app">
    <div class="left">
      <div class="top">
        <Minimap :game="game" />
        <Player-info :game="game" />
      </div>
      <div class="bottom">
        <Player-actions :game="game" />
      </div>
    </div>
    <div class="right">
      <Map :game="game" />
    </div>
  </div>
</template>

<script>
import Game from './game/Game'
import Map from './components/Map'
import Minimap from './components/Minimap'
import PlayerInfo from './components/PlayerInfo'
import PlayerActions from './components/PlayerActions'

export default {
  data() {
    return {
      game: new Game()
    }
  },
  mounted() {
    window.game = this.game
  },
  components: {
    Map,
    Minimap,
    PlayerInfo,
    PlayerActions
  }
}
</script>

<style lang="scss">
@import "./css/normalize.min.css";
@import "./css/main.css";

*, :after, :before {
    box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: white;
  width: 1280px;
  height: 720px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .left {
    position: relative;
    width: 560px;
    height: 720px;
    float: left;
    .top {
      position: relative;
      width: 560px;
      height: 360px;
      float: left;
    }
    .bottom {
      width: 560px;
      height: 360px;
    }
  }
  .right {
    position: relative;
    width: 720px;
    height: 720px;
    float: right;
  }
}
</style>
