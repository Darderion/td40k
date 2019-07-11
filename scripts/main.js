
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

    const FMobController = require('./Mob/MobController')
    const mobController = new FMobController(map)

    //while(!map.createRandomBarriers(128).updatePathfinder()) {
    //    map.clearAllBarriers()
    //}

    map.createRandomBarriers(4).updatePathfinder()

    $('#btnPlayTest').click( () => {
        //drawer.draw()
        Mob.updateParams()
        /*
        let rand = Math.floor(Math.random() * map.maxY)
        let path = map.path(map.tiles[0][rand])
        path.push(rand)
        // path = map.pathfinder.defaultPaths[rand]
        let mob = new Mob(map.start, path)
        mob.moveTo()
        //map.pathfinder.defaultPaths.forEach((el) => console.log(el))
        */
       mobController.wave()
    })

    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')

    drawer.test.select(3,4)
})