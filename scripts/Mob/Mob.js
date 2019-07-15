
class Mob {
    constructor(curTile, path, leader) {
        if (!!!Mob.params) {
            throw new Error('Mobs are not configured')
        }

        this.curTile = curTile
        this.nextTile = curTile
        this.hp = 100
        this.damage = 10
        this.speed = 3
        this.path = [...path]
        this.leader = leader;

        this.div = document.createElement("div")
        this.div.style.width = "0"
        this.div.style.height = "0"
        this.div.style.position = "absolute";
        this.div.style.backgroundImage = "url('img/mob.gif')";
        //background-size: cover;
        //background-repeat: no-repeat;
        this.div.classList.add("mob")


        this.id = Mob.params.count;
        this.div.id = "mobDiv"+this.id;

        let pos = this.getCoordinates(this.curTile)
        this.div.style.top = pos.top + 'px';
        this.div.style.left = pos.left + 'px';

        Mob.params.canvas.appendChild(this.div)
        Mob.params.count++;
    }

    get x() {
        return this.curTile.x;
    }

    get y() {
        return this.curTile.y;
    }

    static configure(width, height, left, top, canvas, x, y) {
        Mob.params = {
            width, height, zero : { left, top }, canvas, count : 0,
            map: { x, y }
        }
        Mob.finished = () => { throw new Error('MobController is not configured') }
    }

    static updateParams() {
        Mob.params.zero = {
            left : $('#canvasBackground')[0].getBoundingClientRect().left,
            top : $('#canvasBackground')[0].getBoundingClientRect().top
        }
        Mob.params.start = {
            left : Mob.params.zero.left - 200,
            top : Mob.params.zero.top + Math.floor(Mob.params.height * (Mob.params.map.y/2))
        }
        Mob.params.finish = {
            left : Mob.params.zero.left + Mob.params.width * Mob.params.map.x + 100,
            top : Mob.params.start.top
        }
    }

    getCoordinates(tile = this.curTile) {
        if (tile.local == true) {
            return {
                left : Mob.params.width * tile.x + Mob.params.zero.left,
                top: Mob.params.height * tile.y + Mob.params.zero.top
            }
        } else {
            switch(tile.tower) {
                case "start" : return Mob.params.start;
                case "finish" : return Mob.params.finish;
            }
        }
        return undefined;
    }

    moveTo(dir = this.path.pop()) {
        if (dir == undefined) {
            Mob.finished(this)
            return;
        }
        this.nextTile = this.curTile.neighbors[dir].tile;
        let coordinates = this.getCoordinates(this.nextTile)
        $(this.div).animate({
            left: coordinates.left+'px',
            top: coordinates.top+'px',
            width: Mob.params.width,
            height: Mob.params.height
        }, this.speed * 100 * ((this.curTile.local && this.nextTile.local) ? 1 : 3),
        () => {
            this.curTile = this.nextTile;
            this.moveTo()
        })
        return this;
    }
}

module.exports = Mob;