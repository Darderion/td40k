
class Faction {
    constructor(name) {
        this.name = name;
        this.towers = []
        Faction.list.push(this)
    }
    static configure(data) {

        /* JSFdl */
        function loadImage(url) {
            return new Promise((resolve, reject) => {
              let img = new Image();
              img.addEventListener('load', e => resolve(img));
              img.addEventListener('error', () => {
                reject(new Error(`Failed to load image's URL: ${url}`));
              });
              img.src = url;
            });
          }

        data.forEach(faction => {
            let fact = new Faction(faction.name)
            faction.towers.forEach(tower => {
                let obj = {
                    tower,
                    img: undefined
                }
                loadImage(`./img/Factions/${faction.name}/${tower.name}.png`).then(
                    img => { obj.img = img }
                )
                fact.towers.push(obj)
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