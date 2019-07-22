
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
        this.tiles = []
        for(let i = 0; i < x; i++){
            let col = []
            for(let j = 0; j < y; j++) {
                col.push(new TTile(defaultTower, i, j))
            }
            this.tiles.push(col)
        }

        this.wall = new TTile('wall',-1,-1, false)
        this.start = new TTile('start',-2,-2, false)
        this.finish = new TTile('finish',-3,-3, false)

        const getNeighbor = (curX, curY) =>
            (curY == -1 || curY == y) ? new Neighbor(this.wall, false) :
            (curX == -1) ? new Neighbor(this.start, false) :
            (curX == x) ? new Neighbor(this.finish) : new Neighbor(this.tiles[curX][curY]);

        const coordinateShift = [[
            { x: -1,    y: -1 },
            { x: -1,    y: 0 },
            { x: -1,    y: 1 },
            { x: 0,     y: 1 },
            { x: 1,     y: 0 },
            { x: 0,     y: -1 },
        ],[
            { x: 0,    y: -1 },
            { x: -1,    y: 0 },
            { x: 0,    y: 1 },
            { x: 1,     y: 1 },
            { x: 1,     y: 0 },
            { x: 1,     y: -1 },
        ]]

        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                for(let d = 0; d < 6; d++) {
                    this.tiles[i][j].neighbors[d] =
                        getNeighbor(i + coordinateShift[j%2][d].x, j + coordinateShift[j%2][d].y)
                }
            }
        }
        
        for(let j = 0; j < y; j++) {
            this.start.neighbors.push(new Neighbor(this.tiles[0][j]))
            this.tiles[0][j].neighbors[ODirection.left] =
                new Neighbor(this.start, false)
        }
        for(let j = 0; j < y; j++) {
            this.finish.neighbors.push(new Neighbor(this.tiles[x-1][j], false))
            this.tiles[x-1][j].neighbors[ODirection.right] =
                new Neighbor(this.finish, true)
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