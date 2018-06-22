
class MapCell {
  constructor(x, y, biome) {
    this.x = x
    this.y = y
    this.biome = biome
    this.buildings = []
    this.players = []
  }

  removePlayer(player) {
    this.players.splice(this.players.indexOf(player), 1)
  }

  movePlayer(player) {
    if (player.cell) player.cell.removePlayer(player)
    this.players.push(player)
    player.cell = this
  }
}

export default MapCell
