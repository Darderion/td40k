
class Pathfinder {
    constructor(map, maxX, maxY, tileSides = 6) {
        this.tileSides = tileSides;

        this.map = map;
        this.navMap = []
        this.max = maxX * maxY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.defaultPaths = []
        for(let y = 0; y < maxY; y++) {
            this.defaultPaths.push(undefined)
        }
        for(let x = 0; x < maxX; x++) {
            let col = []
            for(let y = 0; y < maxY; y++) {
                col.push(this.max)
            }
            this.navMap.push(col)
        }
        this.configure()
    }

    getNeighbors(curTile, ind) {
        let res = []
        for(let i = 0; i < this.tileSides; i++) {
            if (curTile.neighbors[i].passable) {
                let neighborTile = curTile.neighbors[i].tile;
                if (neighborTile.local) {
                    if (this.navMap[neighborTile.x][neighborTile.y] > ind)
                        res.push(neighborTile)
                }
            }
        }
        res.forEach((el) => {
            this.navMap[el.x][el.y] = ind
        })
        return res;
    }

    configure(startingTile = this.map.start, finalTile = this.map.finish) {
        let curTile = finalTile;
        const queue = []
        if (curTile == this.map.finish) {
            for(let i = 0; i < this.maxY; i++) {
                queue.push(this.map.tiles[this.maxX - 1][i])
                this.navMap[this.maxX - 1][i] = 0;
            }
        } else {
            queue.push(finalTile)
            this.navMap[finalTile.x][finalTile.y] = 0;
        }
        curTile = finalTile
        while(queue.length > 0) {
            curTile = queue.shift()
            if (curTile == startingTile) break;
            let res = this.getNeighbors(curTile, this.navMap[curTile.x][curTile.y] + 1)
            queue.push(...res)
        }

        for(let i = 0; i < this.maxY; i++) {
            this.defaultPaths[i] = this.path(this.map.tiles[0][i], finalTile)
        }
    }

    path(startingTile) {
        let finalTile = this.map.finish

        if (startingTile == this.map.start) {
            let rand = Math.floor(Math.random() * this.maxY);
            let res = [...this.path(startingTile.neighbors[rand].tile, finalTile)]
            res.push(rand)
            return res;
        }
        if (startingTile.x == 0) {
            if (this.defaultPaths[startingTile.y]) return [...this.defaultPaths[startingTile.y]];
        }
        let curTile = startingTile;
        let path = []
        let nextNeighbor = {}
        let next = {}
        let itter = 0;
        let maxItter = this.max;

        while(curTile != finalTile && itter != maxItter) {
            itter++;
            for(let i = 0; i < this.tileSides; i++) {
                nextNeighbor = curTile.neighbors[i];
                if (nextNeighbor.passable) {
                    next = nextNeighbor.tile;
                    if (next == finalTile ||
                            (next.local &&
                            (this.navMap[curTile.x][curTile.y] - this.navMap[next.x][next.y] == 1))) {
                        path.push(i)
                        curTile = next;
                        break;
                    }
                }
            }
        }
        if (itter == maxItter) return undefined;
        return [...path.reverse()]
    }

    printQueue(arr) {
        let res = "[";
        arr.forEach((el) => res += (el.x+';'+el.y) + " ")
        console.log(res + "]")
    }
}

module.exports = Pathfinder