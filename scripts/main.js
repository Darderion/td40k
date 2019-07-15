
const FDependencyInjector = require('./DependencyInjector')

$(document).ready(function() {
    const dependencyInjector = FDependencyInjector()
    dependencyInjector.configure({
        map : {
            width: 18,
            height: 12
        },
        players : [
            { name : "Bob", faction : "Orcs" }
        ]
    })

    const dependencies = dependencyInjector.getObjects()
    
    const map = dependencies.map
    const drawer = dependencies.drawer
    const menu = dependencies.menu
    const Mob = dependencies.Mob
    const mobController = dependencies.mobController

    const TTileSelector = require('./TileSelector')
    const TileSelector1 = TTileSelector($('#towerSelector'), 3, 3)
    const TileSelector2 = TTileSelector($('#btnPlayMenu'), 3, 3)
    /*while(!map.createRandomBarriers(32).updatePathfinder()) {
        map.clearAllBarriers()
    }*/

    $('#btnPlayTest').click( () => {
        Mob.updateParams()
        mobController.wave()
    })
    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')
})