export default function(game, player) {
  if (!player.alive) return false

  if (!player._ai) {
    player._ai = {
      aggressiveness: Math.floor(1 + Math.random() * 2) // 1, 2, 3
    }
  }

  var finished = false
  var executionN = 0
  while (!finished) {
    if (executionN++ > 10) finished = true
    var availableActions = player.availableActions()

    if (player._ai.aggressiveness <= 2 && getLoot(availableActions)) continue
    if (attack(availableActions)) continue
    if (getLoot(availableActions)) continue
    if (useBandages()) continue
    if (useShields()) continue
    if (move(availableActions)) continue
    if (hideInBush(availableActions)) continue

    finished = true
  }

  function getLoot(availableActions) {
    var availableLoot = availableActions.find(action => action.__name === 'Loot')
    if (availableLoot) {
      availableLoot.use(player)
      return true
    }
    return false
  }

  function useBandages() {
    var availableBandages = player.inventory.slots.find(slot => slot.type === 'Bandages')
    if (availableBandages) player.inventory.activeItem = availableBandages
    else return false
    var availableLoot = player.availableActions().find(action => action.__name === 'UseBandages')
    if (availableLoot) {
      availableLoot.use(player)
      return true
    }
    return false
  }

  function useShields() {
    var availableShield = player.inventory.slots.find(slot => slot.type === 'Shield')
    if (availableShield) player.inventory.activeItem = availableShield
    else return false
    var availableLoot = player.availableActions().find(action => action.__name === 'UseShield')
    if (availableLoot) {
      availableLoot.use(player)
      return true
    }
    return false
  }

  function attack(availableActions) {
    switchToBestWeapon()
    var availableAttacks = availableActions.filter(action => action.__name === 'Attack')
    if (availableAttacks.length) {
      availableAttacks[Math.floor(Math.random() * availableAttacks.length)].use(player)
      return true
    }
    return false
  }

  function move(availableActions) {
    var availableMove = availableActions.find(action => action.__name === 'Move')
    if (availableMove) {
      if (player.inventory.isFull()) {
        var todrop = player.inventory.slots.find(item => item.tier === 1)
        if (todrop) player.inventory.drop(todrop)
      }

      var surroundingCells = player.cell.getAdjacentCells()
      var shuffledCells = surroundingCells.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1])
      var noisiestCell = shuffledCells.sort((a, b) => a.noise < b.noise ? 1 : -1)[0]
      availableMove.use(player, {
        x: noisiestCell.x,
        y: noisiestCell.y
      })
      return true
    }
    return false
  }

  function hideInBush(availableActions) {
    var availableHideInBush = availableActions.find(action => action.__name === 'HideInBush')
    if (availableHideInBush) {
      availableHideInBush.use(player)
      return true
    }
    return false
  }

  function switchToBestWeapon() {
    var bestWeapon = player.inventory.bestWeapon()
    if (player.inventory.activeItem !== bestWeapon) {
      player.inventory.activeItem = bestWeapon
    }
  }
}
