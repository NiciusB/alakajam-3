import Weapon from './Weapon'

class Inventory {
  constructor(player) {
    this.player = player
    this.slots = [
      new Weapon('Melee', 1)
    ]
    this.activeItem = this.slots[0]
  }

  isFull() {
    return this.slots.length >= 5
  }

  drop(item) {
    var itemIndex = this.slots.indexOf(item)
    if (itemIndex === -1) return false
    this.slots.splice(itemIndex, 1)
    this.player.cell.loot.push(item)
    if (item === this.activeItem) {
      this.activeItem = this.slots.length ? (this.slots[itemIndex] || this.slots[this.slots.length - 1]) : false
    }
  }

  equip(item) {
    this.slots.push(item)
  }

  bestWeapon() {
    return this.slots.slice().sort((a, b) => {
      return a.damage < b.damage ? 1 : -1
    })[0]
  }
}

export default Inventory
