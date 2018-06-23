<template>
  <div @click="slotClicked" :class="classNames">
    <div v-if="item">
      <p>{{item.type}}</p>
      <p>Tier {{item.tier}}</p>
      <p v-if="item.ammunition !== Infinity">{{item.ammunition}} ammo</p>
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
      this.game.controlledPlayer.inventory.drop(this.item)
    }
  },
  computed: {
    classNames() {
      const classNames = {}
      classNames.slot = true
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
    &.tier1 {
      background: #848B8F;
    }
    &.tier2 {
      background: #008000;
    }
    &.tier3 {
      background: #3366ff;
    }
    &.tier4 {
      background: #800080;
    }
    &.tier5 {
      background: #ff6600;
    }
  }
</style>
