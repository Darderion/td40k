
const TMob = require('./Mob')

const MobController = function(map, castle) {
    this.map = map;
    this.castle = castle
    this.mobs = []
    this.timer = {}

    TMob.finished = function(mob) {
        mob.div.parentNode.removeChild(mob.div)
        mob.leader.castle.takeDamage(mob.damage)
    }

    MobController.prototype.wave = (counter = 10) => {
        const getTimer = (counter) => {
            setTimeout(
                () => {
                    if (counter != 0) {
                        this.mobs.push(new TMob(
                            this.map.start,
                            this.map.path(this.map.start),
                            this
                            ).moveTo()
                        )
                        this.timer = getTimer(counter - 1)
                    }
                }, 500
            )
        }
        this.timer = getTimer(counter)
    }
}

module.exports = MobController;