
const Castle = function() {
    this.hp = 100;
    Castle.prototype.takeDamage = (damage) => {
        this.hp -= damage;
        console.log(this.hp)
    }
}

module.exports = Castle;