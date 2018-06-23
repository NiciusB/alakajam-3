
class Weapon {
  constructor(type, tier) {
    this.type = type
    this.tier = tier
    this.ammunition = this.defaultAmmunition(type, tier)
    this.damage = this.calculateDamage(type, tier)
  }

  defaultAmmunition(type, tier) {
    if (type === 'Melee') return Infinity
    if (type === 'Shotgun') return 5 + 2 * tier
    if (type === 'Sniper') return 2 + 1 * tier
  }

  calculateDamage(type, tier) {
    if (type === 'Melee') return 10 * tier
    if (type === 'Shotgun') return 20 * tier
    if (type === 'Sniper') return 20 + 10 * tier
  }
}

export default Weapon
