
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

module.exports = Direction