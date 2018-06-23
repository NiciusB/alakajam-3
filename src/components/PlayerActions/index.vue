<template>
  <div class="actions">
    <Inventory :game="game" />
    <p>Action Points left: {{game.controlledPlayer.actionPoints}}</p>
    <p>Actions:</p>
    <p class="action" @click="action.use(game.controlledPlayer)" v-for="action in availableActions" :key="action.name">{{action.name}} ({{action.actionPoints}} ap)</p>
  </div>
</template>

<script>
import Inventory from './Inventory'

export default {
  props: {
    game: Object
  },
  computed: {
    availableActions() {
      return this.game.controlledPlayer.availableActions()
    }
  },
  components: {
    Inventory
  }
}
</script>

<style scoped lang="scss">
  .actions {
    width: 560px;
    height: 360px;
    text-align: center;
    .action {
      cursor: pointer;
    }
  }
</style>
