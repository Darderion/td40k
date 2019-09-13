
const Castle = function(hpBar) {
    this.hp = 100;
    this.hpBar = hpBar;

    const emptying = function() {
        hpBar.value = 0;
        hpBar.bars.css('border', '0px');
        hpBar.hpValue.css('margin', '1.3% 0 0 20%')
        hpBar.hpValue.text("You've lost! Refresh your browser to try again")
    };

    hpBar.onEmptying(emptying)

    hpBar.fill()

    Castle.prototype.takeDamage = damage => {
        this.hpBar.takeDamage(damage)
        this.hp -= damage;
    }
}

module.exports = Castle;