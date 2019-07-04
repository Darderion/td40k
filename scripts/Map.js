
const Direction = {
    get top() {    return 0},
    get left() {   return 1},
    get bottom() { return 2},
    get right() {  return 3},
    reverse : (val) => (val + 2) % 4,
    get: (x,y) => (Math.abs(x) + Math.abs(y) != 1) ? undefined :
        ((x == 1) ? Direction.right :
            ((x == -1) ? Direction.left :
                ((y == 1) ? Direction.bottom :
                    (y == -1) ? Direction.top : undefined)
            )
        ),
    coordinates: (dir) => {
        switch(dir % 4) {
            case 0: return { x: 0,  y: -1 }
            case 1: return { x: -1, y: 0  }
            case 2: return { x: 0,  y: 1  }
            case 3: return { x: 1,  y: 0  }
        }
    }
}

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
        this.neighbors[direction].tile.neighbors[Direction.reverse(direction)].passable = passability
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
}

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
                col.push(new Tile(defaultTower, i, j))
            }
            tiles.push(col)
        }

        const wall = new Tile('wall',-1,-1, false)
        wall.neighbors = []
        this.wall = wall;
        const start = new Tile('start',-2,-2, false)
        this.start = start;
        const finish = new Tile('finish',-3,-3, false)
        this.finish = finish;

        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                tiles[i][j].neighbors[Direction.top] = (j==0) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i][j-1]);
                tiles[i][j].neighbors[Direction.left] = (i==0) ? new Neighbor(this.start, false) : new Neighbor(tiles[i-1][j]);
                tiles[i][j].neighbors[Direction.bottom] = (j==y-1) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i][j+1]);
                tiles[i][j].neighbors[Direction.right] = (i==x-1) ? new Neighbor(this.finish, false) : new Neighbor(tiles[i+1][j]);
            }
        }
        this.tiles = tiles
        for(let j = 0; j < y; j++) {
            this.start.neighbors.push(new Neighbor(this.tiles[0][j]))
            this.tiles[0][j].neighbors[Direction.left] = new Neighbor(this.start, false)
        }
        for(let j = 0; j < y; j++) {
            finish.neighbors.push(new Neighbor(this.tiles[x-1][j], false))
            this.tiles[x-1][j].neighbors[Direction.right] = new Neighbor(this.finish, true)
        }
    }

    getRemoteTile(x) {
        switch(x) {
            case -1: return this.wall;
            case -2: return this.start;
            case -3: return this.finish;
        }
    }

    getTile(x,y) {
        return (x < 0) ? this.getRemoteTile(x) : this.tiles[x][y]
    }

    getTower(x,y) {
        return this.getTile(x,y).tower;
    }

    setTower(x,y,val) {
        this.getTile(x,y).tower = val;
    }

    passable(startingTile,finalTile) {
        return (this.path(startingTile,finalTile) != undefined)
    }

    path(startingTile,finalTile) {
        if (startingTile.local && finalTile.local) {
            //Optimization for specific cases
            let x = finalTile.x - startingTile.x
            let y = finalTile.y - startingTile.y
            let dif = Math.abs(x) + Math.abs(y)
            if (dif == 0) return []
            if (dif == 1) {
                if (startingTile.neighbors[Direction.get(x,y)].passable) {
                    return [Direction.get(x,y)]
                } else {
                    return undefined
                }
            }
        }

        const navMap = this.getNavigationalMap()
        startingTile = navMap.getTile(startingTile.x, startingTile.y)
        finalTile = navMap.getTile(finalTile.x, finalTile.y)

        const check = (curTile, map, finalTile, iter) => {
            if (map.getTower(curTile.x, curTile.y) < iter) return false;
            map.setTower(curTile.x, curTile.y, iter)
            if (Tile.haveEqualCoordinates(curTile, finalTile)) return true;

            let res = false;
            for(let i = 0; i < curTile.neighbors.length; i++) {
                if (curTile.neighbors[i].passable) {
                    if (check(curTile.neighbors[i].tile, map, finalTile, iter + 1) == true) res = true;
                }
            }
            return res;
        }

        if (check(startingTile, navMap, finalTile, 0) == true) {
            let res = []
            const pathfinder = (curTile, map, startingTile, res) => {
                if (Tile.haveEqualCoordinates(curTile, startingTile)) return res;
                let dirs = []
                for(let i = 0; i < curTile.neighbors.length; i++) {
                    if (curTile.tower - curTile.neighbors[i].tile.tower == 1) {
                        dirs.push(i)
                    }
                }
                let dir = dirs[Math.floor(Math.random()*(dirs.length))]

                if (dir == undefined) {
                    console.log(curTile.neighbors)
                    for(let i = 0; i < curTile.neighbors.length; i++) {
                        if (curTile.tower - curTile.neighbors[i].tile.tower != 1) {
                            console.log(curTile.tower - curTile.neighbors[i].tile.tower)
                        }
                    }
                    for(let x = 0; x < map.maxX; x++) {
                        let row = []
                        for(let y = 0; y < map.maxY; y++) {
                            if (Tile.haveEqualCoordinates(map.tiles[x][y], curTile))
                            row.push('X')
                            row.push(map.tiles[x][y].tower)
                        }
                        console.log(row)
                    }
                }

                res.push(Tile.getDirection(curTile.neighbors[dir].tile, curTile))

                pathfinder(curTile.neighbors[dir].tile, map, startingTile, res)
            }
            pathfinder(finalTile, navMap, startingTile, res)
            return res;
        }

        return undefined
    }

    forEachTile(funct) {
        this.tiles.forEach(column => {
            column.forEach(tile => {
                funct(tile)
            })
        })
    }

    getNavigationalMap() {
        let max = this.maxX * this.maxY + 10
        let map = new Map(this.maxX, this.maxY, max)
        for(let x = 0; x < map.maxX; x++) {
            for(let y = 0; y < map.maxY; y++) {
                for(let dir = 0; dir < 4; dir++) {
                    map.tiles[x][y].neighbors[dir].passable = this.tiles[x][y].neighbors[dir].passable;
                }
            }
        }
        map.start.tower = max;
        map.finish.tower = max;
        map.wall.tower = max;
        return map;
    }

    setPassability(x,y,dir,passability) {
        this.tiles[x][y].setPassability(dir, passability)
        return this;
    }

    barrier(x,y,dir) {
        return this.setPassability(x,y,dir,false)
    }

    clearBarriers() {
        this.forEachNeighbor((neighbor) => neighbor.passable = true)
    }

    createRandomBarriers(n) {
        let res = []
        let rand = (excludedMax) => Math.floor(Math.random() * excludedMax);
        let setRandomWall = () => {
            let x = rand(this.maxX)
            let y = rand(this.maxY)
            let dir = rand(4)
            if (this.tiles[x][y].neighbors[dir].passable) {
                this.setPassability(x,y,dir,false)
                return { x, y, dir }
            }
            return null;
        }
        let sum = 0;
        while(sum != n) {
            let cur = setRandomWall()
            if (cur) {
                res.push(cur)
                sum++;
            }
        }
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

    static get Direction() { return Direction }
}

module.exports = Map;