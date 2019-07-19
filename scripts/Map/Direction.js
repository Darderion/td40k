
const Direction = {
    get topLeft() {     return 0 },
    get left() {        return 1 },
    get bottomLeft() {  return 2 },
    get bottomRight() { return 3 },
    get right() {       return 4 },
    get topRight() {    return 5 },
    reverse : (val) => (val + 3) % 6
}

module.exports = Direction