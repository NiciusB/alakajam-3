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
    <transition-group name="fade" tag="div" class="damage-feed">
      <p v-for="event in damageFeed()" :key="JSON.stringify(event)">{{event.text}}</p>
    </transition-group>
    <div class="loading" v-if="game.loadingTurn"></div>
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
  methods: {
    damageFeed() {
      this.game.controlledPlayer.damageFeed.forEach(dmgEvent => {
        if (!dmgEvent.disappearTimeout) {
          dmgEvent.disappearTimeout = setTimeout(() => {
            this.game.controlledPlayer.damageFeed.splice(this.game.controlledPlayer.damageFeed.indexOf(dmgEvent), 1)
          }, 2500)
          dmgEvent.text = `${dmgEvent.reason} attacked you for ${dmgEvent.damage} damage`
        }
      })
      return this.game.controlledPlayer.damageFeed
    }
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
  top: 50%;
  left: 50%;
  margin: -360px 0 0 -640px;
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
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    top: 0;
    left: 0;
    cursor :wait;
  }
  .damage-feed {
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    width: 400px;
    margin: 0 auto;
    text-align: center;
    p {
      font-size: 1.1em;
      text-shadow: 0 0 1px rgba(204, 0, 0, 0.5);
      color: #cc0000;
      margin: 0.5em auto;
      width: 100%;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
