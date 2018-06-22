<template>
  <div id="app">
    <Minimap/>
  </div>
</template>

<script>
import Minimap from './components/Minimap'

export default {
  name: 'App',
  components: {
    Minimap
  }
}
</script>

<style lang="scss">
@import "./css/normalize.min.css";
@import "./css/main.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
}
</style>
