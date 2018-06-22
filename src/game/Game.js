import Map from './Map'
import Player from './Player'
import BasicAI from './BasicAI'

class Game {
  constructor(map) {
    if (!map) map = new Map()
    this.map = map
    this.turn = 1
    this.controlledPlayer = new Player(false, this.map.randomCell())
    this.players = [this.controlledPlayer]
    while (this.players.length < 100) {
      this.players.push(new Player(BasicAI, this.map.randomCell()))
    }
  }
}

export default Game
