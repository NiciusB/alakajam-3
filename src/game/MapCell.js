import loot from './loot'

class MapCell {
  constructor(map, x, y, biome) {
    this.map = map
    this.x = x
    this.y = y
    this.biome = biome
    this.noise = 0
    this.players = []
    this.loot = []
    this.generateLoot()
  }

  changeNoise(change) {
    this.noise += change
    if (this.noise < 0) this.noise = 0
    if (this.noise > 100) this.noise = 100
  }

  generateLoot() {
    if (!this.biome.options || !this.biome.options.loot) return false

    var itemsNum = Math.floor(0 + Math.random() * 2)
    for (let k = 0; k < itemsNum; k++) {
      var luck = Math.floor(this.biome.options.loot[0] + Math.random() * (this.biome.options.loot[1] - this.biome.options.loot[0]))
      this.loot.push(loot(luck))
    }
  }

  removePlayer(player) {
    this.players.splice(this.players.indexOf(player), 1)
  }

  movePlayer(player) {
    if (player.cell) player.cell.removePlayer(player)
    this.players.push(player)
    player.cell = this
    this.changeNoise(15)
  }

  getAdjacentCells() {
    return [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(adjacent => this.map.cell(this.x + adjacent[0], this.y + adjacent[1]))
  }
}

export default MapCell
