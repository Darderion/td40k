
const Drawer = function(canvas,numOfColumns,numOfRows,width,height,map) {

    const param = { canvas,numOfColumns,numOfRows,width,height,map }

    param.blockWidth = width/numOfRows
    param.blockHeight = height/numOfColumns

    param.ctx = canvas.getContext('2d')
    param.ctx.canvas.width =  width
    param.ctx.canvas.height = height

    const Colours = {
        unpassable : 'red',
        passable: 'black'
    }

    const getWallColour = (x, y, neighbor) => param.map.tiles[x][y].neighbors[neighbor].passable ? Colours.passable : Colours.unpassable

    const getCoordinateShift = (neighbor) => ({ x : (neighbor + 1) % 2, y : (neighbor % 2) })

    const drawLine = function(x,y,neighbor) {
        param.ctx.strokeStyle = getWallColour(x,y,neighbor)
        if (neighbor == 3) x++;
        if (neighbor == 2) y++;
        let d = getCoordinateShift(neighbor)

        param.ctx.beginPath()
        param.ctx.moveTo(x*param.blockWidth,y*param.blockHeight);
        param.ctx.lineTo((x+d.x)*param.blockWidth,(y+d.y)*param.blockHeight);
        param.ctx.stroke();
    }

    const draw = function() {
        for(let x = 1; x < param.numOfColumns;x++) {
            for(let y = 1; y < param.numOfRows;y++) {
                drawLine(x,y,0)
                drawLine(x,y,1)
            }
        }
        for(let y = 0; y < param.numOfRows-1; y++) {
            drawLine(0,y,2)
        }
        for(let x = 0; x < param.numOfColumns-1; x++) {
            drawLine(x,0,3)
        }
    }

    return { draw }
}

module.exports = Drawer;