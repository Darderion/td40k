
class Mob {
    constructor(curTile, path) {
        if (!!!Mob.params) {
            throw new Error('Mobs are not configured')
        }

        this.curTile = curTile
        this.nextTile = curTile
        this.hp = 100
        this.damage = 10
        this.speed = 3
        this.path = path

        this.div = document.createElement("div")
        //this.div.style.width = Mob.params.width+"px";
        //this.div.style.height = Mob.params.height+"px";
        this.div.style.width = "0";
        this.div.style.height = "0";
        this.div.style.position = "absolute";
        this.div.style.backgroundColor = "red";

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
            start : { left : left - 200, top : top + Math.floor(height * (y/2)) },
            map: { x, y }
        }
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
        console.log(tile)
        if (tile.local == true) {
            console.log('PogChamp')
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

    moveTo(dir) {
        if (!!!dir) return;
        this.nextTile = this.curTile.neighbors[dir].tile;
        let coordinates = this.getCoordinates(this.nextTile)
        $(this.div).animate({
            left: coordinates.left+'px',
            top: coordinates.top+'px',
            width: Mob.params.width,
            height: Mob.params.height
        }, this.speed * 100 * ((this.curTile.local && this.nextTile.local) ? 1 : 3),
        () => {
            this.moveTo()
        })
    }
}

module.exports = Mob;