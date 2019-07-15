
const Data = {
        Factions : [
        {
            name : "Orcs",
            towers : [
                {   name : "shoota",attack : {
                    damage : { min : 3, max : 5, type : "bullets"}, range : 3, speed : 5 },
                    price : { gold : 100 }},
                {   name : "flaya",   attack : {
                    damage : { min : 4, max : 8, type : "bullets"}, range : 2, speed : 8 },
                    price : { gold : 200 }},
                {   name : "reshala", attack : {
                    damage : { min : 5, max : 10,type: "melee"},    range : 1, speed : 7 },
                    price : { gold : 300 }},
                {   name : "boom-boom", attack : {
                    damage : { min : 10, max : 15, type: "explosive"}, range : 2, speed : 10 },
                    price : { gold : 300 }}
            ]
        }
    ]
}

module.exports = Data;