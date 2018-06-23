import Map from './Map'
import Player from './Player'
import BasicAI from './BasicAI'

class Game {
  constructor(map) {
    if (!map) map = new Map()
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
      this.players.forEach(player => {
        if (player.ai) player.ai(this, player)
      })
    }

    this.turn++
    this.players.forEach(player => {
      player.actionPoints = 3
    })
  }
}

export default Game
