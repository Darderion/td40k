
class Faction {
    constructor(name) {
        this.name = name;
        this.towers = []
        Faction.list.push(this)
    }
    addTower(tower) {
        this.towers.push(tower)
    }
    static configure(data) {
        data.forEach(faction => {
            let fact = new Faction(faction.name)
            faction.towers.forEach(tower => {
                fact.addTower(tower)
            })
        })
    }
    static getByName(name) {
        for(let i = 0; i < Faction.list.length; i++) {
            if (Faction.list[i].name == name) return Faction.list[i];
        }
    }
}

Faction.list = []

module.exports = Faction