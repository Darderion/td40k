
const Builder = function(tileSelector, towerSelector, builderOverlayImageObject, players, map) {
    if (!players || !players.length) throw new Error("Attempting to create Builder without players")
    this.players = players;
    this.curPlayer = players[0];
    this.tileSelector = tileSelector;
    this.towerSelector = towerSelector;
    this.curTowerID = -1;
    this.builderOverlayImageObject = builderOverlayImageObject;
    this.events = {
        onBuild : [],
        onNotEnoughResources : []
    }
    const addEventHandler = (eventHandler, event) => event.push(eventHandler)
    const triggerEvent = (event, params) => event.forEach(e => e(...params))

    this.build = tower => triggerEvent(this.events.onBuild, [tower])
    this.onBuild = eventHandler => addEventHandler(eventHandler, this.events.onBuild)

    this.notEnoughResources = _ => triggerEvent(this.events.onNotEnoughResources)
    this.onNotEnoughResources = eventHandler => addEventHandler(eventHandler, this.events.onNotEnoughResources)

    this.getTowerOverlayCoordinates = (x, y) => {
        const offset = $(this.tileSelector.playGround).parent().offset()
        return {
            left: offset.left + (x - 0.55 * (y % 2)) * this.builderOverlayImageObject.tileWidth,
            top: offset.top + (y - 1) * this.builderOverlayImageObject.tileHeight
        }
    }

    this.drawCurTower = _ => {
        this.builderOverlayImageObject.img.src = this.curTowerID == -1 ?
            undefined:
            this.curPlayer.faction.towers[this.curTowerID].img.src;
        this.builderOverlayImageObject.img.style.height = `${this.builderOverlayImageObject.tileHeight * 2}px`;
    }

    this.changeCurPlayer = ind => {
        this.curPlayer = players[ind]
        this.drawCurTower()
        //this.builderOverlayImageObject.img.style.width = `${this.builderOverlayImageObject.tileWidth}px`;
    }

    this.changeCurTowerID = id => {
        this.curTowerID = id;
        this.drawCurTower()
    }

    this.tileSelector.onClick((x, y) => {
        if (y < 1) return;
        y--;
        if (this.curTowerID == -1) return;
        const towerObj = this.curPlayer.faction.towers[this.curTowerID];
        this.builderOverlayImageObject.img.src = undefined;
        if (this.curPlayer.gold >= towerObj.tower.price.gold) {
            this.curPlayer.gold -= towerObj.tower.price.gold;
            const tower = {
                val: towerObj.tower,
                coord: {
                    x, y
                }
            }
            this.curPlayer.towers.push(tower)
            this.build(tower)
            console.log('Built a tower')
        } else {
            console.log('Need to construct additional pilons')
        }
    })

    this.tileSelector.onChange((x, y) => {
        if (y < 1) return;
        const coord = this.getTowerOverlayCoordinates(x, y)
        $(this.builderOverlayImageObject.img).css('left', `${coord.left}px`)
        $(this.builderOverlayImageObject.img).css('top', `${coord.top}px`)
        y--;
    })

    this.towerSelector.onClick((x, y) => {
        this.changeCurTowerID(x + y * 3);
        this.towerSelector.toggle()
    })

    this.towerSelector.button.click( _ => this.towerSelector.toggle(this.curPlayer.faction) )
    this.onBuild(
        tower => {
            const x = tower.coord.x;
            const y = tower.coord.y;
            map.tiles[x][y].tower = tower.val;
            console.log(map.updatePathfinder())
            //console.log(map.tiles[tower.coord.x][tower.coord.y])
        }
    )
}

module.exports = Builder