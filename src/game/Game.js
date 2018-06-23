import Map from './Map'
import Player from './Player'
import BasicAI from './BasicAI'

class Game {
  constructor(map) {
    if (!map) map = new Map(this)
    this.map = map
    this.turn = 0
    this.players = []
    this.controlledPlayer = new Player(this, false, this.map.randomCell())
    this.players.push(this.controlledPlayer)
    while (this.players.length < 100) {
      this.players.push(new Player(this, BasicAI, this.map.randomCell()))
    }
    this.nextTurn()
  }

  nextTurn() {
    if (this.turn !== 0) {
      this.players.forEach((player, index) => {
        if (player.ai) {
          setTimeout(() => {
            player.ai(this, player)
          }, index * 5)
        }
      })

      this.map.cells.forEach(cell => {
        if (cell.noise < 0.01) return false
        cell.getAdjacentCells().forEach(neighbourCell => {
          if (typeof neighbourCell.noise !== 'undefined') neighbourCell.changeNoise(cell.noise * 0.025)
        })
      })
      this.map.cells.forEach(cell => {
        cell.changeNoise(-cell.noise * 0.3)
      })
    }

    setTimeout(() => {
      this.turn++
      this.players.forEach(player => {
        player.actionPoints = 5
      })
    }, 700)
  }
}

export default Game
