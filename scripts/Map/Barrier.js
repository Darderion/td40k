
const Barrier = {
    removeAll : (map) => map.forEachNeighbor((neighbor) => neighbor.passable = true),
    createRandom : (map, n = 1) => {
        let res = []
        let rand = (excludedMax) => Math.floor(Math.random() * excludedMax);
        let setRandomWall = () => {
            let x = rand(map.maxX)
            let y = rand(map.maxY)
            let dir = rand(6)
            if (map.tiles[x][y].neighbors[dir].passable && map.tiles[x][y].neighbors[dir].tile.local) {
                map.setPassability(x,y,dir,false)
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
    },
    removeRandom(map) {
        let sdir = Math.floor(Math.random() * 6)
        let sx = Math.floor(Math.random() * map.maxX)
        let sy = Math.floor(Math.random() * map.maxY)

        let dir = sdir;
        let x = (sx + 1) % map.maxX;
        let y = sy;

        while(
            !((dir == sdir) && (x == sx) && (y == sy)) &&
            !(!map.tiles[x][y].neighbors[dir].passable && map.tiles[x][y].neighbors[dir].tile.local)
            ){
            x = (x + 1) % map.maxX;
            if (x == sx) {
                y = (y + 1) % map.maxY;
                if (y == sy) dir = (dir + 1) % this.tileSides;
            }
        }
        if ((!map.tiles[x][y].neighbors[dir].passable && map.tiles[x][y].neighbors[dir].tile.local)) {
            map.setPassability(x, y, dir, true)
            return;
        }
    }
}

module.exports = Barrier;