
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

    $('#btnPlayTest').click( () => {
        Mob.updateParams()
        //let path = map.path(map.start, map.finish)
        let mob = new Mob(map.start, map.path(map.start, map.finish))
        mob.moveTo()
    })

    map.createRandomBarriers(32);

    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')

    drawer.test.select(3,4)
})