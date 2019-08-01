
const Map = require('../Map/Map')

it('CorrectWidth', () => {
    let map = new Map(3,2)
    expect(map.maxX).toBe(3)
})

it('CorrectHeight', () => {
    let map = new Map(3,2)
    expect(map.maxY).toBe(2)
})

it('TilePassableInside', () => {
    let map = new Map(3,2)
    map.barrier(1,1,4)
    expect(map.tiles[1][1].passableInside(1)).toBe(true)
    expect(map.tiles[1][1].passableInside(4)).toBe(false)
})

it('DirectionReverse', () => {
    expect(Map.Direction.reverse(Map.Direction.right)).toBe(Map.Direction.left)
    expect(Map.Direction.reverse(Map.Direction.left)).toBe(Map.Direction.right)
    expect(Map.Direction.reverse(Map.Direction.topLeft)).toBe(Map.Direction.bottomRight)
    expect(Map.Direction.reverse(Map.Direction.bottomRight)).toBe(Map.Direction.topLeft)
    expect(Map.Direction.reverse(Map.Direction.topRight)).toBe(Map.Direction.bottomLeft)
    expect(Map.Direction.reverse(Map.Direction.bottomLeft)).toBe(Map.Direction.topRight)
})

it('numberOfTiles', () => {
    let map = new Map(4,3)
    expect(map.tiles.reduce((prev,cur) => cur.length + prev, 0)).toBe(12)
})

it('forEachTile', () => {
    let map = new Map(4,3)
    let sum = 0
    map.forEachTile((tile) => { sum++ })
    expect(sum).toBe(12)
})

it('setPassability', () => {
    let map = new Map(3,2)
    map.tiles[1][1].setPassability(4, false)
    expect(map.tiles[2][1].neighbors[2].passable).toBe(false)
})

it('truthyNeighbors', () => {
    let map = new Map(4,3)
    let sum;
    map.forEachTile((tile) => {
        sum = 0;
        tile.neighbors.forEach((el) => {
            expect(el.tile).toBeTruthy()
            sum++;
        })
        expect(sum).toBe(6)
    })
})

/*
it('path', () => {
    let map = new Map(4,3)
    map.barrier(1,1,3).barrier(1,1,2).barrier(1,0,3).updatePathfinder()
    let startingTile = map.tiles[1][1]
    expect(map.path(startingTile,map.finish)).toStrictEqual([3, 4, 4, 3, 2, 1])
}) */

it('clearBarriers', () => {
    let map = new Map(4,3)
    expect(map.tiles[1][0].neighbors[3].passable).toBe(true)
    map.barrier(1,1,3).barrier(1,1,2).barrier(1,0,3).updatePathfinder()
    map.removeAllBarriers()
    expect(map.tiles[1][0].neighbors[3].passable).toBe(true)
    expect(map.tiles[1][1].neighbors[3].passable).toBe(true)
    expect(map.tiles[1][1].neighbors[2].passable).toBe(true)
    expect(map.tiles[1][0].neighbors[3].passable).toBe(true)
})

it('forEachNeighbor', () => {
    let map = new Map(4,3)
    let sum = 0
    map.forEachNeighbor(neighbor => sum++)
    expect(sum).toBe(46)
})

it('fullMobPath', () => {
    let map = new Map(5,4)
    //expect(map.path(map.start, map.tiles[1][0]).length >= 2).toBe(true)
    expect(map.path(map.tiles[1][0]).length >= 4).toBe(true)
    expect(map.path(map.start).length >= 5).toBe(true)
})

it('MxNMapTest', () => {
    let map = new Map(18,14)
    let path = map.path(map.start)
    map.pathfinder.defaultPaths.forEach(el => expect(el.length).toBe(18))
    expect(map.path(map.start).length).toBe(19)
    expect(map.path(map.start).length).toBe(19)
    expect(map.path(map.start).length).toBe(19)
})

it('removeRandomBarrier', () => {
    map = new Map(8,4)

    map.barrier(3,2,3).barrier(2,2,2);
    const walls = () => map.obstacles.length;

    map.removeRandomBarrier()
    expect(walls()).toBe(1)
    map.removeRandomBarrier()
    expect(walls()).toBe(0)
    map.removeRandomBarrier()
    expect(walls()).toBe(0)
})

it('createRandomBarriers', () => {
    map = new Map(8,4)
    const walls = () => map.obstacles.length;

    map.createRandomBarriers(3)
    expect(walls()).toBe(3)
    map.createRandomBarriers(5)
    expect(walls()).toBe(8)

})