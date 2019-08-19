
const Builder = function(tileSelector, towerSelector, builderOverlayImageObject, players) {
    if (!players || !players.length) throw new Error("Attempting to create Builder without players")
    this.players = players;
    this.curPlayer = players[0];
    this.tileSelector = tileSelector;
    this.towerSelector = towerSelector;
    this.curTowerID = -1;
    this.builderOverlayImageObject = builderOverlayImageObject;

    this.getTowerOverlayCoordinates = (x, y) => {
        const offset = $(this.tileSelector.playGround).parent().offset()
        return {
            left: offset.left + (x - 0.55) * this.builderOverlayImageObject.tileWidth,
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
        if (this.curTowerID == -1) return;
        const towerObj = this.curPlayer.faction.towers[this.curTowerID];
        this.builderOverlayImageObject.img.src = undefined;
        if (this.curPlayer.gold >= towerObj.tower.price.gold) {
            console.log('Built a tower')
        } else {
            console.log('Need to construct additional pilons')
        }
    })

    this.tileSelector.onChange((x, y) => {
        const coord = this.getTowerOverlayCoordinates(x, y)
        $(this.builderOverlayImageObject.img).css('left', `${coord.left}px`)
        $(this.builderOverlayImageObject.img).css('top', `${coord.top}px`)
        console.log(coord.left)
    })

    this.towerSelector.onClick((x, y) => {
        this.changeCurTowerID(x + y * 3);
        this.towerSelector.toggle()
    })

    this.towerSelector.button.click( _ => this.towerSelector.toggle(this.curPlayer.faction) )
}

module.exports = Builder