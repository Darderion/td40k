
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
        this.neighbors = [ {}, {}, {}, {} ];
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
}

class Neighbor {
    constructor(tile, passable=true) {
        this.passable = passable;
        this.tile = tile
    }
}

class Map {
    constructor(x, y) {
        const wall = new Tile('wall',-1,-1, false)
        wall.neighbors = []

        this.wall = wall;

        const tiles = []
        for(let i = 0; i < x; i++){
            let col = []
            for(let j = 0; j < y; j++) {
                col.push(new Tile('{'+i+';'+j+'}', i, j))
            }
            tiles.push(col)
        }

        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                tiles[i][j].neighbors[Direction.top] = (j==0) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i][j-1]);
                tiles[i][j].neighbors[Direction.left] = (i==0) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i-1][j]);
                tiles[i][j].neighbors[Direction.bottom] = (j==y-1) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i][j+1]);
                tiles[i][j].neighbors[Direction.right] = (i==x-1) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i+1][j]);
            }
        }
        this.tiles = tiles
    }

    passable(x1,y1,x2,y2) {
        return (this.path(x1,y1,x2,y2) != undefined)
    }

    path(x1,y1,x2,y2) {
        let x = x2 - x1
        let y = y2 - y1
        let dif = Math.abs(x) + Math.abs(y)
        if (dif == 0) return []
        if (dif == 1) {
            if (this.tiles[x1][y1].neighbors[Direction.get(x,y)].passable) {
                return [Direction.get(x,y)]
            } else {
                return undefined
            }
        }

        const stepMap = []
        let max = this.maxX * this.maxY
        for(let i = 0; i < this.maxX; i++){
            let col = []
            for(let j = 0; j < this.maxY; j++) {
                col.push(max)
            }
            stepMap.push(col)
        }

        const check = (curTile, map, finalTile, iter) => {
            if (map[curTile.x][curTile.y] < iter) return false;
            map[curTile.x][curTile.y] = iter;
            if ((curTile.x == finalTile.x) && (curTile.y == finalTile.y)) return true;

            let res = false;
            curTile.neighbors.forEach((el) => {
                if (el.passable && (check(el.tile, map, finalTile, iter+1) == true)) res = true;
            })
            return res;
        }
        
        let pathfinderResponse = check(this.tiles[x1][y1], stepMap, this.tiles[x2][y2], 0)
        if (pathfinderResponse) {
            let next = (curTile, map, finalTile, path) => {
                if ((curTile.x == finalTile.x) && (curTile.y == finalTile.y)) return path;
                let availableNeighbors = curTile.availableNeighbors;
                for(let i = 0; i < availableNeighbors.length; i++) {
                    let neighbor = availableNeighbors[i]
                    let tile = neighbor.tile;
                    if (map[curTile.x][curTile.y] - map[tile.x][tile.y] == 1) {
                        path.push(Direction.get(
                            curTile.x - tile.x, curTile.y - tile.y
                        ))
                        return next(tile, map, finalTile, path)
                    }
                }
            }
            let res = next(this.tiles[x2][y2], stepMap, this.tiles[x1][y1],[])
            return res;
        } else {
            return undefined
        }
    }

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