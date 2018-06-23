import Weapon from './Weapon'

class Inventory {
  constructor(player) {
    this.player = player
    this.slots = [
      new Weapon('Melee', 1)
    ]
    this.activeWeapon = this.slots[0]
  }

  isFull() {
    return this.slots.length >= 5
  }

  drop(item) {
    var itemIndex = this.slots.indexOf(item)
    if (itemIndex === -1) return false
    this.slots.splice(itemIndex, 1)
    if (item === this.activeWeapon) this.activeWeapon = this.slots.length ? this.slots[0] : false
    this.player.cell.loot.push(item)
  }

  equip(item) {
    this.slots.push(item)
  }
}

export default Inventory
