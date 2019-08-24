
const ODirection = require('./Direction')
const OBarrier = require('./Barrier')
const TPathfinder = require('./Pathfinder')
const TTile = require('./Tile')

const EmptyTileTower = { name: "empty" }

class Neighbor {
    constructor(tile, passable=true) {
        this.passable = passable;
        this.tile = tile
    }
}

class Map {

    get maxX() { return this.tiles.length }
    get maxY() { return this.tiles[0].length }

    initBarriers() {
        for(let x = 0; x < this.maxX; x++) {
            for(let y = 0; y < this.maxY; y++) {
                for(let d = 0; d < 6; d++) {
                    this.tiles[x][y].neighbors[d].passable =
                        (this.tiles[x][y].neighbors[d].tile.tower != "wall") &&
                        (this.tiles[x][y].neighbors[d].tile.tower != "start")
                }
            }
        }
    }

    constructor(x, y, defaultTower = EmptyTileTower) {
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
        this.obstacles = []

        const getNeighbor = (curX, curY) =>
            (curY == -1 || curY == y) ? new Neighbor(this.wall) :
            (curX == -1) ? new Neighbor(this.start) :
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

        this.initBarriers()
        
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
        this.updateBarriers()
        this.pathfinder = new TPathfinder(this, this.maxX, this.maxY)
        for(let i = 0; i < this.maxY; i++) {
            if (!this.pathfinder.defaultPaths[i]) return false;
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
        if (passability)
            this.obstacles.remove({x,y,dir})
        else
            this.obstacles.push({x,y,dir})
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

    static get Direction() { return ODirection }

    updateBarriers() {
        this.initBarriers()
        for(let ind in this.obstacles) {
            let wall = this.obstacles[ind]
            //this.tiles[wall.x][wall.y].setPassability(wall.dir, false)
            this.tiles[wall.x][wall.y].setPassability(wall.dir, false)
        }
        let tower = {}
        for(let x = 0; x < this.maxX; x++) {
            for(let y = 0; y < this.maxY; y++) {
                tower = this.tiles[x][y].tower;
                if (tower != EmptyTileTower) {
                    console.log(tower)
                    for(let dir = 0; dir < 6; dir++) {
                        this.tiles[x][y].setPassability(dir, false)
                    }
                }
            }
        }
    }

    barrier(x,y,dir) {
        this.setPassability(x,y,dir,false);
        return this;
    }
    removeAllBarriers() {
        this.obstacles = OBarrier.removeAll(this.obstacles);
        this.updateBarriers()
        return this;
    }
    createRandomBarriers(n) {
        OBarrier.createRandom(this, n);
        this.updateBarriers()
        return this;
    }
    removeRandomBarrier() {
        this.obstacles = OBarrier.removeRandom(this.obstacles);
        this.updateBarriers()
        return this;
    }

    tileIsEmpty(tile) { tile.local && tile.tower == defaultTower; }
}

module.exports = Map;