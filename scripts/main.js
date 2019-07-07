
const FDependencyInjector = require('./DependencyInjector')

$(document).ready( function() {
    const dependencyInjector = FDependencyInjector()
    dependencyInjector.configure({
        map : {
            width: 180,
            height: 140
        }
    })

    const dependencies = dependencyInjector.getObjects()

    const map = dependencies.map
    const drawer = dependencies.drawer
    const menu = dependencies.menu
    const Mob = dependencies.Mob

    map.createRandomBarriers(32).updatePathfinder()

    $('#btnPlayTest').click( () => {
        Mob.updateParams()
        let rand = Math.floor(Math.random() * map.maxY)
        let path = map.path(map.tiles[0][rand])
        path.push(rand)
        // path = map.pathfinder.defaultPaths[rand]
        let mob = new Mob(map.start, path)
        mob.moveTo()
        //map.pathfinder.defaultPaths.forEach((el) => console.log(el))
    })

    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')

    drawer.test.select(3,4)
})