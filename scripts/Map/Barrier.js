
const Barrier = {
    removeAll : (obstacles) => [],
    createRandom : (map, n = 1) => {
        let rand = (excludedMax) => Math.floor(Math.random() * excludedMax);
        let setRandomWall = () => {
            let x = rand(map.maxX)
            let y = rand(map.maxY)
            let dir = rand(6)
            let obj = {
                x, y, dir
            }
            if (!map.obstacles.includes(obj) && map.tiles[x][y].neighbors[dir].tile.local) {
                return obj;
            }
            return null;
        }
        let sum = 0;
        while(sum != n) {
            let cur = setRandomWall()
            if (cur) {
                map.obstacles.push(cur)
                sum++;
            }
        }
    },
    removeRandom(obstacles) {
        const rand = Math.floor(Math.random() * obstacles.length)
        obstacles[rand] = undefined
        return obstacles.filter( i => i != undefined)
    }
}

module.exports = Barrier;