
const FDependencyInjector = require('./DependencyInjector')

$(document).ready( function() {
    const dependencyInjector = FDependencyInjector()
    dependencyInjector.configure({
        map : {
            width: 12,
            height: 10
        }
    })

    const map = dependencyInjector.getObjects().map
    const drawer = dependencyInjector.getObjects().drawer
    const menu = dependencyInjector.getObjects().menu

    map.createRandomBarriers(8);

    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')

    drawer.test.select(3,4)
})