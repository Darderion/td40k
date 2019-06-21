
const CL = {
    top: 0,
    left: 1,
    bottom: 2,
    right: 3,
    reverse : (val) => (val + 2) % 4
}

class Tile {
    constructor(tower) {
        this.neighbors = [ {}, {}, {}, {} ];
        this.tower = tower;
    }

    setBarrier(direction, barrier) {
        this.neighbors[direction].passable = barrier
        this.neighbors[direction].tile.neighbors[CL.reverse(direction)].passable = barrier
    }
}

class Neighbor {
    constructor(tile, passable=true) {
        this.passable = passable;
        this.tile = tile
    }
}

export class Map {
    constructor(x, y) {
        const wall = new Tile('wall')
        wall.neighbors = []

        this.wall = wall;

        const tiles = []
        for(let i = 0; i < x; i++){
            let col = []
            for(let j = 0; j < y; j++) {
                col.push(new Tile('{'+i+';'+j+'}'))
            }
            tiles.push(col)
        }

        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                tiles[i][j].neighbors[CL.top] = (j==0) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i][j-1]);
                tiles[i][j].neighbors[CL.left] = (i==0) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i-1][j]);
                tiles[i][j].neighbors[CL.bottom] = (j==y-1) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i][j+1]);
                tiles[i][j].neighbors[CL.right] = (i==x-1) ? new Neighbor(this.wall, false) : new Neighbor(tiles[i+1][j]);
            }
        }

        this.tiles = tiles
    }
}