import Inventory from './Inventory'
import gamertags from './gamertags'
import actions from './actions'

class Player {
  constructor(game, ai, cell) {
    this.game = game
    this.id = this.game.players.length
    this.ai = ai
    this.name = this.ai === false ? '' : this.randomGamertag()
    this.killCount = 0
    this.health = 100
    this.shield = 0
    this.actionPoints = 0
    this.inventory = new Inventory(this)
    cell.movePlayer(this)
  }

  randomGamertag() {
    var randomGamertag = gamertags[Math.floor(Math.random() * gamertags.length)]
    return this.game.players.some(player => player.name === randomGamertag) ? this.randomGamertag() : randomGamertag
  }

  surroundingCells() {
    if (!this.cell) return []

    var surroundingCells = []
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        surroundingCells.push(this.game.map.cell(x + this.cell.x, y + this.cell.y))
      }
    }
    return surroundingCells
  }

  availableActions() {
    const availableActions = []
    Object.keys(actions).forEach(actionName => {
      if (actionName === 'Attack') {
        this.surroundingCells().forEach(cell => {
          if (!cell.players) return true
          cell.players.forEach(player => {
            if (player !== this && actions[actionName].isAvailable(this, {player})) {
              availableActions.push({
                __name: actions[actionName].__name,
                name: `${actions[actionName].name} ${player.name}`,
                actionPoints: actions[actionName].actionPoints,
                isAvailable: actions[actionName].isAvailable,
                use: () => { actions[actionName].use(this, {player}) } // Custom run
              })
            }
          })
        })
        return true
      }

      if (actions[actionName].isAvailable(this)) {
        availableActions.push({
          __name: actions[actionName].__name,
          name: actions[actionName].name,
          actionPoints: actions[actionName].actionPoints,
          isAvailable: actions[actionName].isAvailable,
          use: actions[actionName].use
        })
      }
    })

    return availableActions
  }

  inRangeFor(player) {
    if (!this.inventory.activeWeapon) return false

    var distance = Math.abs(player.cell.x - this.cell.x) + Math.abs(player.cell.y - this.cell.y)
    if (['Melee', 'Shotgun'].indexOf(this.inventory.activeWeapon.type) !== -1) {
      return distance <= 0
    }
    if (['Sniper'].indexOf(this.inventory.activeWeapon.type) !== -1) {
      return distance <= 1
    }
    return false
  }

  attack(player) {
    if (!this.inRangeFor(player)) return false
    player.damage(this.inventory.activeWeapon.damage)
    this.cell.changeNoise(this.inventory.activeWeapon.noise)
  }

  damage(damage) {
    this.cell.changeNoise(5)
    this.shield -= damage
    if (this.shield < 0) {
      this.health += this.shield
      this.shield = 0
      if (this.health <= 0) this.die()
    }
  }

  die() {
    this.cell.changeNoise(10)
    if (this === this.game.controlledPlayer) {
      alert('Game Over')
      document.location.reload()
    }

    if (this.inventory.slots.length) {
      var todrop = this.inventory.bestWeapon()
      this.cell.loot.push(todrop)
    }
    this.cell.removePlayer(this)
    this.game.players.splice(this.game.players.findIndex(player => player === this), 1)
  }
}

export default Player
