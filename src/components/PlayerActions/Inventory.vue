<template>
  <div class="inventory">
    <inventory-slot v-for="(item, index) in slots" :key="index" :item="item" :game="game" />
  </div>
</template>

<script>
import InventorySlot from './InventorySlot'

export default {
  props: {
    game: Object
  },
  computed: {
    slots() {
      const filledSlots = this.game.controlledPlayer.inventory.slots.slice()
      while (filledSlots.length < 5) filledSlots.push(false)
      return filledSlots
    }
  },
  components: {
    InventorySlot
  }
}
</script>

<style scoped lang="scss">
  .inventory {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
</style>
