
const Builder = function(tileSelector, towerSelector, players) {
    if (!players || !players.length) throw new Error("Attempting to create Builder without players")
    this.players = players;
    this.curPlayer = players[0];
    this.tileSelector = tileSelector;
    this.towerSelector = towerSelector;
    this.curTowerID = -1;

    this.tileSelector.onClick((x, y) => {
        if (this.curTowerID == -1) return;
        const tower = this.curPlayer.faction.towers[this.curTowerID];
        console.log(this)
        console.log(tower)
        if (this.curPlayer.gold >= tower.tower.price.gold) {
            console.log('Built a tower')
        } else {
            console.log('Need to construct additional pilons')
        }
    })

    this.towerSelector.onClick((x, y) => {
        this.curTowerID = x + y * 3;
    })
}

module.exports = Builder