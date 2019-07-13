
const FDependencyInjector = require('./DependencyInjector')
const FTowerSelector = require('./TowerSelector')

$(document).ready(function() {
    
    console.log(FTowerSelector);

    const wrapper = $('#towerSelector')
    
    FTowerSelector(3,3,wrapper)

    const dependencyInjector = FDependencyInjector()
    dependencyInjector.configure({
        map : {
            width: 18,
            height: 12
        }
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
    TileSelector1.onChange(() => console.log('1'))
    TileSelector2.onChange(() => console.log('2'))
    //while(!map.createRandomBarriers(32).updatePathfinder()) {
    //    map.clearAllBarriers()
    //}

    $('#btnPlayTest').click( () => {
        Mob.updateParams()
        mobController.wave()
    })
    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')
})