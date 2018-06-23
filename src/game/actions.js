
const actions = {}

actions.HideInBush = {
  name: 'Hide in bush',
  actionPoints: 1,
  isAvailable: function (player) {
    if (this.actionPoints > player.actionPoints) return false
    return true
  },
  use: function (player) {
    if (!this.isAvailable(player)) return false
    player.actionPoints -= this.actionPoints

    player.changeNoise(-15)
    return true
  }
}

actions.Loot = {
  name: 'Loot',
  actionPoints: 1,
  isAvailable: function (player) {
    if (this.actionPoints > player.actionPoints) return false
    if (player.inventory.isFull()) return false
    if (!player.cell.loot.length) return false
    return true
  },
  use: function (player) {
    if (!this.isAvailable(player)) return false
    player.actionPoints -= this.actionPoints

    var randomItemIndex = Math.floor(Math.random() * player.cell.loot.length)
    player.inventory.equip(player.cell.loot[randomItemIndex])
    player.cell.loot.splice(randomItemIndex, 1)
    return true
  }
}

actions.Move = {
  name: 'Move',
  actionPoints: 2,
  isAvailable: function (player, options = {}) {
    if (this.actionPoints > player.actionPoints) return false
    if (!(typeof options.x === 'undefined' || typeof options.y === 'undefined') && !player.game.map.cell(options.x, options.y).biome) return false
    return true
  },
  use: function (player, options = {}) {
    if (typeof options.x === 'undefined' || typeof options.y === 'undefined') {
      alert('Click in the map to move')
      return false
    }
    if (!this.isAvailable(player, options)) return false
    player.actionPoints -= this.actionPoints
    player.game.map.cell(options.x, options.y).movePlayer(player)
    return true
  }
}

actions.FinishTurn = {
  name: 'Finish Turn',
  actionPoints: 0,
  isAvailable: function (player) {
    return player === player.game.controlledPlayer
  },
  use: function (player) {
    if (!this.isAvailable(player)) return false

    player.game.nextTurn()
    return true
  }
}

export default actions
