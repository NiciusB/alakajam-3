<template>
  <div @click="slotClicked" :class="classNames">
    <div v-if="item">
      <p>{{item.type}}</p>
      <p>Tier {{item.tier}}</p>
      <p v-if="item.ammunition && item.ammunition !== Infinity">{{item.ammunition}} ammo</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: Object,
    item: {
      default: false
    }
  },
  methods: {
    slotClicked() {
      if (!this.item) return false
      this.game.controlledPlayer.inventory.activeItem = this.item
    }
  },
  computed: {
    classNames() {
      const classNames = {}
      classNames.slot = true
      if (this.item === false) return classNames
      classNames.active = this.item === this.game.controlledPlayer.inventory.activeItem
      classNames[`tier${this.item.tier}`] = true
      return classNames
    }
  }
}
</script>

<style scoped lang="scss">
  .slot {
    width: 80px;
    height: 80px;
    cursor: pointer;
    transition: 0.2s all ease-out;
    box-shadow: 0 0 2px 1px rgba(255, 0, 0, 0.1);
    &.active {
      box-shadow: 0 0 2px 2px rgba(255, 0, 0, 0.95);
    }
    &.tier1 {
      background: #848B8F;
    }
    &.tier2 {
      background: #008000;
      color: #ccc;
    }
    &.tier3 {
      background: #3366ff;
      color: #ccc;
    }
    &.tier4 {
      background: #800080;
      color: #ccc;
    }
    &.tier5 {
      background: #ff6600;
    }
    >div {
      width: 80px;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      p {
          margin: 0;
      }
    }
  }
</style>
