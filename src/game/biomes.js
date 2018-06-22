class Biome {
  constructor(name, backgroundColor) {
    this.name = name
    this.backgroundColor = backgroundColor
  }
}

const biomes = {}

biomes.Plains = new Biome('Plains', '#B9C739')
biomes.Desert = new Biome('Desert', '#9B7766')
biomes.Beach = new Biome('Beach', '#D7D700')
biomes.Jungle = new Biome('Jungle', '#396721')
biomes.Rural = new Biome('Rural', '#C5A287')
biomes.City = new Biome('City', '#AFA7A4')
biomes.Ocean = new Biome('Ocean', '#236D7F')
biomes.Lake = new Biome('Lake', '#236D7F')

biomes.allBiomes = Object.keys(biomes).filter(val => (['Lake', 'Ocean', 'City', 'Beach'].indexOf(val) === -1) && biomes[val] instanceof Biome).map(val => biomes[val])

biomes.random = function(x, y, mapSize) {
  var isBorder = x === 0 || y === 0 || x === mapSize - 1 || y === mapSize - 1
  if (isBorder) return biomes.Ocean

  var isNextToBorder = x === 1 || y === 1 || x === mapSize - 2 || y === mapSize - 2
  if (Math.random() < 0.3 && isNextToBorder) return biomes.Ocean

  var isBottomLeftCorner = x < 7 && y > mapSize - 7
  if (Math.random() < 0.8 && isBottomLeftCorner) return biomes.Ocean

  var isSomeOtherCorner = (x < 4 && y < 4) || (x > mapSize - 4 && y > mapSize - 4) || (x > mapSize - 4 && y < 4)
  if (Math.random() < 0.7 && isSomeOtherCorner) return biomes.Ocean

  var isNextToBorder2 = x < 3 || y < 3 || x > mapSize - 3 || y > mapSize - 3
  if (Math.random() < 0.1 && isNextToBorder2) return biomes.Ocean
  if (Math.random() < 0.8 && isNextToBorder2) return biomes.Beach

  return biomes.allBiomes[Math.floor(Math.random() * biomes.allBiomes.length)]
}

export default biomes
