
const Drawer = function(canvases,numOfColumns,numOfRows,width,height,map) {
    
    const param = { canvases,numOfColumns,numOfRows,width,height,map }
    const levels = {
        background : 0,
        walls : 1
    }

    param.blockWidth = width/numOfColumns
    param.blockHeight = height/numOfRows
    param.ctxs = []

    canvases.forEach((el) => {
        let ctx = el.getContext('2d')
        ctx.canvas.width = width
        ctx.canvas.height = height
        param.ctxs.push(ctx)
    })

    const Colours = {
        unpassable : 'red',
        passable: 'black'
    }

    const getWallColour = (x, y, neighbor) => param.map.tiles[x][y].neighbors[neighbor].passable ? Colours.passable : Colours.unpassable

    const getCoordinateShift = (neighbor) => ({ x : (neighbor + 1) % 2, y : (neighbor % 2) })

    const drawLine = function(x,y,neighbor) {
        let ctx = param.ctxs[levels.walls]
        ctx.strokeStyle = getWallColour(x,y,neighbor)
        if (neighbor == 3) x++;
        if (neighbor == 2) y++;
        let d = getCoordinateShift(neighbor)

        ctx.beginPath()
        ctx.moveTo(x*param.blockWidth,y*param.blockHeight);
        ctx.lineTo((x+d.x)*param.blockWidth,(y+d.y)*param.blockHeight);
        ctx.stroke();
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

    const test = {
        select : function(x,y) {
            let ctx = param.ctxs[levels.walls]
            ctx.fillStyle = "green"
    
            ctx.rect(x*param.blockWidth,y*param.blockHeight, param.blockWidth, param.blockHeight);
            ctx.fill()
        }
    }

    return { draw, test }
}

module.exports = Drawer;