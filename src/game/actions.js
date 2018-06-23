
const actions = {}

actions.FinishTurn = {
  __name: 'FinishTurn',
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

actions.DropActiveWeapon = {
  __name: 'DropActiveWeapon',
  name: 'Drop active weapon',
  actionPoints: 0,
  isAvailable: function (player) {
    if (this.actionPoints > player.actionPoints) return false
    if (!player.inventory.activeWeapon) return false
    return true
  },
  use: function (player) {
    if (!this.isAvailable(player)) return false
    player.actionPoints -= this.actionPoints

    player.inventory.drop(player.inventory.activeWeapon)
    return true
  }
}

actions.HideInBush = {
  __name: 'HideInBush',
  name: 'Hide in bush',
  actionPoints: 1,
  isAvailable: function (player) {
    if (this.actionPoints > player.actionPoints) return false
    if (['Ocean', 'Lake'].indexOf(player.cell.biome.name) !== -1) return false
    if (player.cell.noise === 0) return false
    return true
  },
  use: function (player) {
    if (!this.isAvailable(player)) return false
    player.actionPoints -= this.actionPoints

    player.cell.changeNoise(-20)
    return true
  }
}

actions.Loot = {
  __name: 'Loot',
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

actions.Attack = {
  __name: 'Attack',
  name: 'Attack',
  actionPoints: 3,
  isAvailable: function (player, options = {}) {
    if (typeof options.player === 'undefined') return false
    if (this.actionPoints > player.actionPoints) return false
    if (!player.inventory.activeWeapon) return false
    if (!player.inRangeFor(options.player)) return false
    return true
  },
  use: function (player, options = {}) {
    if (!this.isAvailable(player, options)) return false
    player.actionPoints -= this.actionPoints
    player.attack(options.player)
    return true
  }
}

actions.Move = {
  __name: 'Move',
  name: 'Move',
  actionPoints: 3,
  isAvailable: function (player, options = {}) {
    if (this.actionPoints > player.actionPoints) return false
    if (!(typeof options.x === 'undefined' || typeof options.y === 'undefined')) {
      if (!player.game.map.cell(options.x, options.y).biome) return false
      if (options.x === player.cell.x && options.y === player.cell.y) return false
    }
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

export default actions
