import Weapon from './Weapon'

class Inventory {
  constructor() {
    this.slots = [
      new Weapon('Melee', 1)
    ]
  }
}

export default Inventory
