
const Barrier = {
    create : (map, x,y,dir) => map.setPassability(x,y,dir,false),
    clearAll : (map) => map.forEachNeighbor((neighbor) => neighbor.passable = true),
    createRandom : (map, n = 1) => {
        let res = []
        let rand = (excludedMax) => Math.floor(Math.random() * excludedMax);
        let setRandomWall = () => {
            let x = rand(map.maxX)
            let y = rand(map.maxY)
            let dir = rand(4)
            if (map.tiles[x][y].neighbors[dir].passable) {
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
    }
}

module.exports = Barrier;