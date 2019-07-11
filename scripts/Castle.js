
const Castle = function(hpBar) {
    this.hp = 100;
    this.hpBar = hpBar;
    hpBar.fill()
    Castle.prototype.takeDamage = (damage) => {
        this.hpBar.takeDamage(damage)
        this.hp -= damage;
        console.log(this.hp)
    }
}

module.exports = Castle;