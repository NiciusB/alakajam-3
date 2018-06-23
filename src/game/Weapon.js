
class Weapon {
  constructor(type, tier) {
    this.type = type
    this.tier = tier
    this.ammunition = this.defaultAmmunition(type, tier)
  }

  defaultAmmunition(type, tier) {
    if (type === 'Melee') return Infinity
    if (type === 'Shotgun') return 10 * tier
    if (type === 'Sniper') return 2 * tier

    return 10 * tier
  }
}

export default Weapon
