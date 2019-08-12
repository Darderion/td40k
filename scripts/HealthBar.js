
const healthBar =  function(width) {
    return {
        width,
        value : 100,
        mainBar : $('#healthBarMain'),
        damageBar: $('#healthBarDamage'),
        borderBar: $('#healthBarBorder'),
        bars: $('.hpBar'),
        hpValue : $('#hpValue'),
        takenDamage : 0,

        fill : function() {
            this.hpValue.text(`${this.value}%`);
            this.bars.animate({
                'width' : `${this.width}px`
            },1000)
        },

        takeDamage : function(damage){
            if (damage >= this.value) {
                this.value -= damage;
                this.bars.css('border','0px');
                this.hpValue.css('margin','1.3% 0 0 20%')
                this.hpValue.text("You've lost! Refresh your browser to try again")
                return;
            }
            let tempDamage;
            this.takenDamage += damage;
            this.value-=damage;
            const step = this.width/100;
            this.hpValue.text(`${this.value}%`),
            this.mainBar.animate({
                    'width' : `${step*this.value}px`
                },100,
                () => {
                    tempDamage = this.takenDamage
                    let deleteYellow = () => {
                        if(this.takenDamage == tempDamage){
                            this.damageBar.animate({
                                'width' : `${step*this.value}px`
                            },500)
                        }
                    }
                    setTimeout(deleteYellow,500)
                }
            )
        }
    }
}

module.exports = healthBar;