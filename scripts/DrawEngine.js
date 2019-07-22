
const Drawer = function(canvases,numOfColumns,numOfRows,width,height,map,tileSides) {
    
    const param = { canvases,numOfColumns,numOfRows,width,height,map,tileSides }
    const levels = {
        background : 0,
        walls : 1
    }

    // Calculation for hexes
    param.blockWidth = width/(numOfColumns + 0.5)
    param.blockHeight = height/(numOfRows * 0.75 + 0.25)
    
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

    const drawLine = function(x,y,neighbor) {
        let ctx = param.ctxs[levels.walls]
        ctx.strokeStyle = getWallColour(x,y,neighbor)

        const getCoord = (dir) => {
            switch(dir % param.tileSides) {
                case 0: return { x: 0.5, y: 0 }
                case 1: return { x: 0, y: 0.25 }
                case 2: return { x: 0, y: 0.75 }
                case 3: return { x: 0.5, y: 1 }
                case 4: return { x: 1, y: 0.75 }
                case 5: return { x: 1, y: 0.25 }
            }
        }

        const coordShift = {
            x1: getCoord(neighbor).x,
            y1: getCoord(neighbor).y,
            x2: getCoord(neighbor + 1).x,
            y2: getCoord(neighbor + 1).y
        }

        x += 0.5 * (y % 2)
        y *= 0.75

        const coord = {
            x1: (x+coordShift.x1) * param.blockWidth,
            y1: (y+coordShift.y1) * param.blockHeight,
            x2: (x+coordShift.x2) * param.blockWidth,
            y2: (y+coordShift.y2) * param.blockHeight
        }

        ctx.beginPath()
        ctx.moveTo(coord.x1, coord.y1)
        ctx.lineTo(coord.x2, coord.y2)
        ctx.stroke()
    }

    const draw = function() {
        for(let x = 0; x < param.numOfColumns;x++) {
            for(let y = 0; y < param.numOfRows;y++) {
                for(let d = 0; d < param.tileSides; d++) {
                    drawLine(x,y,d)
                }
            }
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