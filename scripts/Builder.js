
const Builder = function(selectorOverlay, players) {
    if (!players || !players.length) throw new Error("Attempting to create Builder without players")
    this.players = players;
    this.curPlayer = players[0];
    this.selectorOverlay = selectorOverlay;

    this.selectorOverlay.onClick(() => {
        if (this.curPlayer.gold > 100) {
            // Build a tower
        }
    })
}

module.exports = Builder