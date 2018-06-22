import Inventory from './Inventory'

class Player {
  constructor(ai, cell) {
    this.ai = ai
    this.killCount = 0
    this.health = 100
    this.shield = 0
    this.actionPoints = 0
    this.inventory = new Inventory()
    cell.movePlayer(this)
  }
}

export default Player
