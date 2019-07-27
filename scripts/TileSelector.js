
function TileSelector(playGround, x, y, width, height) {
    if (!width) { width = Number(playGround.css('width').slice(0,-2)) }
    if (!height) { height = Number(playGround.css('height').slice(0,-2)) }
    const obj = {
        change : [],
        click : [],
        prev : {
            left : 0,
            top : 0
        },
        mouse : {
            left: 0,
            top: 0
        },
        tileSize : {
            width : width / x,
            height : height / y
        },
        public : {
            onChange : (eventHandler) => obj.change.push(eventHandler),
            onClick : (eventHandler) => obj.click.push(eventHandler)
        }
    }

    const changed = () => {
        const coord1 = getCoordinates(obj,obj.prev.left,obj.prev.top)
        const coord2 = getCoordinates(obj,obj.mouse.left,obj.mouse.top)
        return (coord1.x != coord2.x || coord1.y != coord2.y) ? coord2 : undefined
    }

    const getCoordinates = (selector, cx,cy) => ({
            x : Math.floor(cx / selector.tileSize.width),
            y : Math.floor(cy / selector.tileSize.height)
    })

    playGround.click(() => {
        const coord = getCoordinates(obj, obj.mouse.left, obj.mouse.top)
        obj.click.forEach(handler => handler(coord.x, coord.y))
    })

    playGround.mouseout({selector: obj}, function(e) {

        const selector = e.data.selector;
        selector.mouse.left = -1;
        selector.mouse.top = -1;

        //const coord = getCoordinates(selector, selector.mouse.left, selector.mouse.top)
    })

    playGround.mousemove({selector: obj}, function(e) {

        const selector = e.data.selector;

        const parentOffset = $(this).parent().offset();
        selector.prev.left = selector.mouse.left;
        selector.prev.top = selector.mouse.top;
        selector.mouse.left = e.pageX - parentOffset.left;
        selector.mouse.top = e.pageY - parentOffset.top;

        const coordChanged = changed()
        if (coordChanged) { obj.change.forEach(handler => handler(coordChanged.x, coordChanged.y)) }

        //const coord = getCoordinates(selector, selector.mouse.left, selector.mouse.top)
    })

    return obj.public
}

module.exports = TileSelector;