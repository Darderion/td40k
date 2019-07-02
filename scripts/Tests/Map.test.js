
const Map = require('../Map')

let map = new Map()

it('CorrectWidth', () => {
    let map = new Map(3,2)
    expect(map.maxX).toBe(3)
})

it('CorrectHeight', () => {
    let map = new Map(3,2)
    expect(map.maxY).toBe(2)
})

it('DirectionGet', () => {
    expect(Map.Direction.get(0,-1)).toBe(0)
    expect(Map.Direction.get(-1,0)).toBe(1)
    expect(Map.Direction.get(0, 1)).toBe(2)
    expect(Map.Direction.get(1, 0)).toBe(3)
    expect(Map.Direction.get(0, 0)).toBe(undefined)
    expect(Map.Direction.get(1, 1)).toBe(undefined)
    expect(Map.Direction.get(2, 0)).toBe(undefined)
    expect(Map.Direction.get(0,-4)).toBe(undefined)
})

it('DirectionReverse', () => {
    expect(Map.Direction.reverse(Map.Direction.right)).toBe(Map.Direction.left)
    expect(Map.Direction.reverse(Map.Direction.left)).toBe(Map.Direction.right)
    expect(Map.Direction.reverse(Map.Direction.top)).toBe(Map.Direction.bottom)
    expect(Map.Direction.reverse(Map.Direction.bottom)).toBe(Map.Direction.top)
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
    map.tiles[1][1].setPassability(3, false)
    expect(map.tiles[2][1].neighbors[1].passable).toBe(false)
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
        expect(sum).toBe(4)
    })
})

it('passable', () => {
    let map = new Map(4,3)
    expect(map.passable(1,1,1,1)).toBe(true)
    expect(map.passable(0,1,1,1)).toBe(true)
    expect(map.passable(1,1,3,2)).toBe(true)
    map.setPassability(0,1,Map.Direction.right,false)
    map.setPassability(0,1,Map.Direction.bottom,false)
    expect(map.passable(0,1,3,1)).toBe(true)
    map.setPassability(0,0,Map.Direction.right,false)
    expect(map.passable(0,1,3,1)).toBe(false)
    expect(map.passable(1,1,3,2)).toBe(true)
})

it('path', () => {
    let map = new Map(4,3)
    map.barrier(1,1,3).barrier(1,1,2).barrier(1,0,3)
    expect(map.path(1,1,2,2)).toStrictEqual([3,3,2,1])
})

it('clearBarriers', () => {
    let map = new Map(4,3)
    expect(map.tiles[1][0].neighbors[3].passable).toBe(true)
    map.barrier(1,1,3).barrier(1,1,2).barrier(1,0,3)
    map.clearBarriers()
    expect(map.tiles[1][0].neighbors[3].passable).toBe(true)
    expect(map.tiles[1][1].neighbors[3].passable).toBe(true)
    expect(map.tiles[1][1].neighbors[2].passable).toBe(true)
    expect(map.tiles[1][0].neighbors[3].passable).toBe(true)
})

it('forEachNeighbor', () => {
    let map = new Map(4,3)
    let sum = 0
    map.forEachNeighbor((neighbor) => sum++)
    expect(sum).toBe(34)
})