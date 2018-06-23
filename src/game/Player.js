import Inventory from './Inventory'
import gamertags from './gamertags'
import actions from './actions'

class Player {
  constructor(game, ai, cell) {
    this.game = game
    this.id = this.game.players.length
    this.ai = ai
    this.alive = true
    this.name = this.ai === false ? '' : this.randomGamertag()
    this.killCount = 0
    this.health = 100
    this.shield = 0
    this.actionPoints = 0
    this.damageFeed = []
    this.inventory = new Inventory(this)
    cell.movePlayer(this)
  }

  randomGamertag() {
    var randomGamertag = gamertags[Math.floor(Math.random() * gamertags.length)]
    return this.game.players.some(player => player.name === randomGamertag) ? this.randomGamertag() : randomGamertag
  }

  availableActions() {
    const availableActions = []
    Object.keys(actions).forEach(actionName => {
      if (actionName === 'Attack') {
        this.cell.getAdjacentCells().forEach(cell => {
          if (!cell.players) return true
          cell.players.forEach(player => {
            if (player !== this && actions[actionName].isAvailable(this, {player})) {
              availableActions.push({
                __name: actions[actionName].__name,
                name: `${actions[actionName].name} ${player.name}`,
                actionPoints: typeof actions[actionName].actionPoints === 'function' ? actions[actionName].actionPoints(this) : actions[actionName].actionPoints,
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
          actionPoints: typeof actions[actionName].actionPoints === 'function' ? actions[actionName].actionPoints(this) : actions[actionName].actionPoints,
          isAvailable: actions[actionName].isAvailable,
          use: actions[actionName].use
        })
      }
    })

    return availableActions
  }

  inRangeFor(player) {
    if (!this.inventory.activeItem) return false

    var distance = Math.abs(player.cell.x - this.cell.x) + Math.abs(player.cell.y - this.cell.y)
    return distance <= this.inventory.activeItem.range
  }

  attack(player) {
    if (!this.inventory.activeItem || !this.inventory.activeItem.damage) return false
    if (!this.inRangeFor(player)) return false
    player.damage(this.inventory.activeItem.damage, this.name, this)
    this.cell.changeNoise(this.inventory.activeItem.noise)
    this.inventory.wasteAmmunition(this.inventory.activeItem)
  }

  giveHeal(amount) {
    this.health += amount
    if (this.health > 100) this.health = 100
  }

  giveShield(amount) {
    this.shield += amount
    if (this.shield > 100) this.shield = 100
  }

  damage(damage, reason, killAwardedTo = false) {
    this.damageFeed.push({damage, reason})
    this.cell.changeNoise(5)
    this.shield -= damage
    if (this.shield < 0) {
      this.health += this.shield
      this.shield = 0
      if (this.health <= 0) this.die(killAwardedTo)
    }
  }

  die(killAwardedTo = false) {
    this.alive = false
    if (killAwardedTo) killAwardedTo.killCount++
    this.cell.changeNoise(10)
    if (this === this.game.controlledPlayer) {
      alert('Game Over')
      document.location.reload()
    }

    if (this.inventory.slots.length) {
      this.inventory.slots.filter(slot => slot.damage === undefined || slot.tier > 1).forEach(todrop => {
        this.cell.loot.push(todrop)
      })
    }
    this.cell.removePlayer(this)
    this.game.players.splice(this.game.players.findIndex(player => player === this), 1)
  }
}

export default Player
