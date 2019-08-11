
const Data = {
        Factions : [
        {
            name : "Orcs",
            towers : [
                {   name : "Squig",attack : {
                    damage : { min : 3, max : 5, type : "bullets"}, range : 3, speed : 5 },
                    price : { gold : 100 }},
                {   name : "Mesilo",   attack : {
                    damage : { min : 4, max : 8, type : "bullets"}, range : 2, speed : 8 },
                    price : { gold : 200 }},
                {   name : "Shoota", attack : {
                    damage : { min : 5, max : 10,type: "melee"},    range : 1, speed : 7 },
                    price : { gold : 300 }},
                {   name : "Strelyalo", attack : {
                    damage : { min : 10, max : 15, type: "explosive"}, range : 2, speed : 10 },
                    price : { gold : 300 }},
                {   name : "Gremlin",attack : {
                    damage : { min : 3, max : 5, type : "bullets"}, range : 3, speed : 5 },
                    price : { gold : 100 }},
                {   name : "FlyBoy",   attack : {
                    damage : { min : 4, max : 8, type : "bullets"}, range : 2, speed : 8 },
                    price : { gold : 200 }},
                {   name : "Mechanic",   attack : {
                    damage : { min : 4, max : 8, type : "bullets"}, range : 2, speed : 8 },
                    price : { gold : 200 }},
                {   name : "Shaman", attack : {
                    damage : { min : 5, max : 10,type: "melee"},    range : 1, speed : 7 },
                    price : { gold : 300 }},
                {   name : "Warboss", attack : {
                    damage : { min : 10, max : 15, type: "explosive"}, range : 2, speed : 10 },
                    price : { gold : 300 }}
            ]
        }
    ]
}

module.exports = Data;