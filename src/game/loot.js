import Weapon from './Weapon'

export default function (luck) {
  var type = Math.random() < 0.2 ? 'Sniper' : (Math.random() < 0.2 ? 'Melee' : 'Shotgun')
  var rollDice = luck - Math.floor(Math.random() * 50)
  var tier = rollDice > 50 ? 5 : (rollDice > 40 ? 4 : (rollDice > 30 ? 3 : (rollDice > 20 ? 2 : 1)))
  return new Weapon(type, tier)
}
