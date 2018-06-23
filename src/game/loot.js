import Weapon from './Weapon'

export default function (luck) {
  var rollDice = luck - Math.floor(Math.random() * 50)

  if (Math.random() < 0.6) {
    // Weapon
    let type = Math.random() < 0.2 ? 'Sniper' : (Math.random() < 0.2 ? 'Melee' : 'Shotgun')
    let tier = rollDice > 50 ? 5 : (rollDice > 40 ? 4 : (rollDice > 30 ? 3 : (rollDice > 20 ? 2 : 1)))
    return new Weapon(type, tier)
  }

  if (Math.random() < 0.4) {
    // Bandages
    let tier = rollDice > 50 ? 5 : (rollDice > 40 ? 4 : (rollDice > 30 ? 3 : (rollDice > 20 ? 2 : 1)))
    return {
      type: 'Bandages',
      actionPoints: tier <= 2 ? 1 : 2,
      use: function(player) {
        player.giveHeal(10 * tier)
      },
      tier
    }
  }

  // Shield
  let tier = rollDice > 50 ? 5 : (rollDice > 40 ? 4 : (rollDice > 30 ? 3 : (rollDice > 20 ? 2 : 1)))
  return {
    type: 'Shield',
    actionPoints: tier <= 2 ? 2 : 3,
    use: function(player) {
      player.giveShield(10 * tier)
    },
    tier
  }
}
