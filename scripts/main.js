
const FDependencyInjector = require('./DependencyInjector')

$(document).ready( function() {
    const dependencyInjector = FDependencyInjector()
    dependencyInjector.configure({
        map : {
            width: 8,
            height: 8
        }
    })

    const map = dependencyInjector.getObjects().map
    map.tiles[5][2].setBarrier(3,false);
    
    const drawer = dependencyInjector.getObjects().drawer
    const menu = dependencyInjector.getObjects().menu

    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')
})