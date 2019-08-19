
const ODirection = require('./Direction')

class Tile {
    constructor(tower, x, y, local = true) {
        this.neighbors = [];
        this.tower = tower;
        this.x = x
        this.y = y
        this.local = local
    }

    setPassability(direction, passability) {
        this.neighbors[direction].passable = passability
        this.neighbors[direction].tile.neighbors[ODirection.reverse(direction)].passable = passability
    }

    get availableNeighbors() {
        let res = []
        this.neighbors.forEach((neighbor) => {
            if (neighbor.passable) res.push(neighbor)
        })
        return res;
    }

    static haveEqualCoordinates(tile1, tile2) {
        return (tile1.x == tile2.x && tile1.y == tile2.y)
    }

    static getDirection(tile1, tile2) {
        for(let i = 0; i < tile1.neighbors.length; i++) {
            if (Tile.haveEqualCoordinates(tile1.neighbors[i].tile, tile2)) return i;
        }
    }

    passableInside(dir) {
        if (this.local != true) throw new Error('Calling passableInside on remote tile!');
        if (this.neighbors[dir].tile.local != true) return false;
        
        return this.neighbors[dir].tile.neighbors[ODirection.reverse(dir)].passable;
    }

    static configure(width, height) {
        Tile.params.width = width;
        Tile.params.height = height;
    }

    static get width() { return Tile.params.width }
    static get height() { return Tile.params.height }
}

Tile.params = {
    width: -1,
    height: -1
}

module.exports = Tile;