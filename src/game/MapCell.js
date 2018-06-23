import loot from './loot'

class MapCell {
  constructor(x, y, biome) {
    this.x = x
    this.y = y
    this.biome = biome
    this.players = []
    this.loot = []
    this.generateLoot()
  }

  generateLoot() {
    if (!this.biome.options || !this.biome.options.loot) return false

    var itemsNum = Math.floor(1 + Math.random() * 2)
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
  }
}

export default MapCell
