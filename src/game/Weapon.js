
class Weapon {
  constructor(type, tier) {
    this.type = type
    this.tier = tier
    this.ammunition = this.defaultAmmunition(type, tier)
    this.damage = this.calculateDamage(type, tier)
    this.noise = this.calculateNoise(type, tier)
    this.range = this.calculateRange(type, tier)
  }

  defaultAmmunition(type, tier) {
    if (type === 'Melee') return Infinity
    if (type === 'Shotgun') return 2 + 1 * tier
    if (type === 'Sniper') return 1 * tier
  }

  calculateDamage(type, tier) {
    if (type === 'Melee') return 10 * tier
    if (type === 'Shotgun') return 5 + 15 * tier
    if (type === 'Sniper') return 20 + 10 * tier
  }

  calculateNoise(type, tier) {
    if (type === 'Melee') return 20 - 2 * tier
    if (type === 'Shotgun') return 60 - 4 * tier
    if (type === 'Sniper') return 60 + 5 * tier
  }

  calculateRange(type, tier) {
    if (type === 'Melee') return 0
    if (type === 'Shotgun') return 1
    if (type === 'Sniper') return 2
  }
}

export default Weapon
