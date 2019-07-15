
const Player = function(name, faction) {
    this.name = name;
    this.gold = 1000;
    this.towers = []
    this.faction = faction;
}

module.exports = Player