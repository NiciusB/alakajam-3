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
    this.noise = 50
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

  changeNoise(change) {
    this.noise += change
    if (this.noise < 0) this.noise = 0
    if (this.noise > 100) this.noise = 100
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
      if (actions[actionName].isAvailable(this)) availableActions.push(actions[actionName])
    })
    return availableActions
  }
}

export default Player
