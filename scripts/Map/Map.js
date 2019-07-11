
const ODirection = require('./Direction')
const OBarrier = require('./Barrier')
const TPathfinder = require('./Pathfinder')
const TTile = require('./Tile')

class Neighbor {
    constructor(tile, passable=true) {
        this.passable = passable;
        this.tile = tile
    }
}

class Map {
    constructor(x, y, defaultTower = { name : "empty" }) {
        const tiles = []
        for(let i = 0; i < x; i++){
            let col = []
            for(let j = 0; j < y; j++) {
                col.push(new TTile(defaultTower, i, j))
            }
            tiles.push(col)
        }

        const wall = new TTile('wall',-1,-1, false)
        wall.neighbors = []
        this.wall = wall;
        const start = new TTile('start',-2,-2, false)
        this.start = start;
        const finish = new TTile('finish',-3,-3, false)
        this.finish = finish;

        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                tiles[i][j].neighbors[ODirection.top] = (j==0) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i][j-1]);
                tiles[i][j].neighbors[ODirection.left] = (i==0) ? new Neighbor(this.start, false) : new Neighbor(tiles[i-1][j]);
                tiles[i][j].neighbors[ODirection.bottom] = (j==y-1) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i][j+1]);
                tiles[i][j].neighbors[ODirection.right] = (i==x-1) ? new Neighbor(this.finish, false) : new Neighbor(tiles[i+1][j]);
            }
        }
        this.tiles = tiles
        for(let j = 0; j < y; j++) {
            this.start.neighbors.push(new Neighbor(this.tiles[0][j]))
            this.tiles[0][j].neighbors[ODirection.left] = new Neighbor(this.start, false)
        }
        for(let j = 0; j < y; j++) {
            finish.neighbors.push(new Neighbor(this.tiles[x-1][j], false))
            this.tiles[x-1][j].neighbors[ODirection.right] = new Neighbor(this.finish, true)
        }

        this.pathfinder = new TPathfinder(this, x, y)
    }

    updatePathfinder() {
        this.pathfinder = new TPathfinder(this, this.maxX, this.maxY)
        for(let i = 0; i < this.maxY; i++) {
            if (!this.pathfinder.defaultPaths) return false;
        }
        return true;
    }

    getRemoteTile(x) {
        switch(x) {
            case -1: return this.wall;
            case -2: return this.start;
            case -3: return this.finish;
        }
    }

    getTile(x,y) { return (x < 0) ? this.getRemoteTile(x) : this.tiles[x][y] }
    getTower(x,y) { return this.getTile(x,y).tower; }
    setTower(x,y,val) { this.getTile(x,y).tower = val; }
    path(startingTile, finalTile) { return this.pathfinder.path(startingTile, finalTile) }

    forEachTile(funct) {
        this.tiles.forEach(column => {
            column.forEach(tile => {
                funct(tile)
            })
        })
    }

    setPassability(x,y,dir,passability) {
        this.tiles[x][y].setPassability(dir, passability)
        return this;
    }

    forEachNeighbor(funct) {
        this.forEachTile((tile) => {
            tile.neighbors.forEach((neighbor) => {
                if (neighbor.tile.local) {
                    funct(neighbor)
                }
            })
        })
    }

    get maxX() { return this.tiles.length }
    get maxY() { return this.tiles[0].length }

    static get Direction() { return ODirection }

    barrier(x,y,dir) { this.setPassability(x,y,dir,false); return this; }
    removeAllBarriers() { OBarrier.removeAll(this); return this; }
    createRandomBarriers(n) { OBarrier.createRandom(this, n); return this; }
    removeRandomBarrier() { OBarrier.removeRandom(map); return this; }
}

module.exports = Map;