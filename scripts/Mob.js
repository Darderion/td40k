
class Mob {
    constructor(curTile) {
        if (!!!Mob.params) {
            throw new Error('Mobs are not configured')
        }

        this.curTile = curTile
        this.nextTile = curTile
        this.hp = 100
        this.damage = 10
        this.speed = 3

        this.div = document.createElement("div")
        this.div.style.width = Mob.params.width+"px";
        this.div.style.height = Mob.params.height+"px";
        this.div.style.position = "absolute";
        this.div.style.backgroundColor = "red";

        this.div.style.top = Mob.params.zero.top
        this.div.style.left = Mob.params.zero.left
        Mob.params.canvas.appendChild(this.div)
    }

    static configure(width, height, left, top, canvas) {
        Mob.params = {
            width, height, zero : { left, top }, canvas
        }
    }
}

module.exports = Mob;