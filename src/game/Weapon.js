
class Weapon {
  constructor(type, tier) {
    this.type = type
    this.tier = tier
    this.ammunition = this.defaultAmmunition(type, tier)
  }

  defaultAmmunition(type, tier) {
    if (type === 'Melee') return Infinity

    return 10 * tier
  }
}

export default Weapon
