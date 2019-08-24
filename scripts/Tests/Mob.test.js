
const Mob = require('../Mob/Mob')

it('configure', () => {
    Mob.configure(800, 600, 20, 40);

    expect(Mob.params.width).toBe(800)
    expect(Mob.params.height).toBe(600)
    expect(Mob.params.zero.left).toBe(20)

    // 640 -> 1240
    expect(Mob.params.zero.top).toBe(640)
})