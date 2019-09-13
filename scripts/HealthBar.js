
const healthBar = function (width, divs) {
    const hpBar = {
        width,
        value: 100,
        mainBar: divs.main,
        damageBar: divs.damage,
        borderBar: divs.borders,
        bars: divs.bars,
        hpValue: divs.value,
        takenDamage: 0,

        emptying: [],
        onEmptying: eventHandler => hpBar.emptying.push(eventHandler),
        fill: function () {
            hpBar.hpValue.text(`${hpBar.value}%`);
            hpBar.bars.animate({
                'width': `${hpBar.width}px`
            }, 1000)
        },
        takeDamage: function (damage) {
            if (damage >= hpBar.value) {
                this.emptying.forEach(handler => handler())
                return;
            }

            let tempDamage;
            const step = hpBar.width / 100;

            hpBar.takenDamage += damage;
            hpBar.value -= damage;
            hpBar.hpValue.text(`${hpBar.value}%`);
            hpBar.mainBar.animate({
                'width': `${step * hpBar.value}px`
            }, 100,
                () => {
                    tempDamage = hpBar.takenDamage
                    setTimeout(() => {
                        if (hpBar.takenDamage == tempDamage) {
                            hpBar.damageBar.animate({
                                'width': `${step * hpBar.value}px`
                            }, 500)
                        }
                    }, 500)
                }
            )
        }
    }

    return hpBar;
}

module.exports = healthBar;