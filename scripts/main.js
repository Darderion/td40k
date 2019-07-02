
const FDependencyInjector = require('./DependencyInjector')

$(document).ready( function() {
    const dependencyInjector = FDependencyInjector()
    dependencyInjector.configure({
        map : {
            width: 18,
            height: 14
        }
    })

    const dependencies = dependencyInjector.getObjects()

    const map = dependencies.map
    const drawer = dependencies.drawer
    const menu = dependencies.menu
    const Mob = dependencies.Mob

    let mob = new Mob()

    map.createRandomBarriers(32);

    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')

    drawer.test.select(3,4)
})