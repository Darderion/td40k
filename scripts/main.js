
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

    //console.log(map.createRandomBarriers(256).updatePathfinder())
    //console.log(map.pathfinder.defaultPaths)

    //dependencies.towerSelector.setFaction(dependencies.Factions.getByName("Orcs"))
    
    while(!map.createRandomBarriers(256).updatePathfinder()) {
        map.clearAllBarriers()
    }

    this.getTile = (x,y) => {
        const res = []
        map.tiles[x][y].neighbors.forEach(neighbor => res.push(neighbor.passable))
        res.forEach((val, ind, arr) => {
            if (val) {
                res[ind] = map.pathfinder.navMap[map.tiles[x][y].neighbors[ind].tile.x][map.tiles[x][y].neighbors[ind].tile.y];
            }
        })
        res.push("("+map.pathfinder.navMap[x][y]+")")
        return res;
    }

    $('#btnPlayTest').click( () => {
        Mob.updateParams()
        mobController.wave()
    })
    drawer.draw();
    menu.switchTo('NoID')
    menu.background.update()

    menu.switchTo('menu')

    this.setFaction = _ =>
    dependencies.towerSelector.setFaction(
        dependencies.Factions.getByName("Orcs")
    )
})