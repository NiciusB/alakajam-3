import MapCell from './MapCell'
import biomes from './biomes'

class Map {
  constructor(game) {
    this.game = game
    this.mapSize = 20
    this.cells = this.generateCells()
  }

  cell(x, y) {
    return this.cells.find(cell => cell.x === x && cell.y === y) || {x, y}
  }

  generateCells() {
    var lake = [Math.floor(5 + Math.random() * (this.mapSize - 10)), Math.floor(5 + Math.random() * (this.mapSize - 10))]
    var lakeSize = 2

    let generatedMap = []
    for (let y = 0; y < this.mapSize; y++) {
      for (let x = 0; x < this.mapSize; x++) {
        var randomBiome = biomes.random(x, y, this.mapSize)

        if (x > lake[0] - lakeSize && x < lake[0] + lakeSize && y > lake[1] - lakeSize && y < lake[1] + lakeSize) randomBiome = biomes.Lake

        generatedMap.push(new MapCell(this, x, y, randomBiome))
      }
    }
    return generatedMap
  }

  randomCell() {
    return this.cells[Math.floor(Math.random() * this.cells.length)]
  }
}

export default Map
