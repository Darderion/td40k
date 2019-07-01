
const FDependencyInjector = require('./DependencyInjector')

$(document).ready( function() {
    const dependencyInjector = FDependencyInjector()
    dependencyInjector.configure({
        map : {
            width: 4,
            height: 7
        }
    })

    const map = dependencyInjector.getObjects().map
    const drawer = dependencyInjector.getObjects().drawer
    const menu = dependencyInjector.getObjects().menu

    map.tiles[2][1].setPassability(3,false);

    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')

    drawer.test.select(3,4)
})