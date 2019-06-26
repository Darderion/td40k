
const menuFactions = function(portraitBorder, portrait1, portrait2, portrait3) {

    let curPos = 1

    const getPos = () => curPos

    const moveTo = (pos) => {
        portraitBorder.animate(
            (pos > curPos) ?
                { 'margin-right': getAnimationMargin(curPos, pos) } :
                { 'margin-left' : getAnimationMargin(curPos, pos)},
            500, function() {
                portraitBorder.css('grid-column',pos)
                portraitBorder.css('margin-right','0')
                portraitBorder.css('margin-left','0')
            })
        curPos = pos;
    }

    const getAnimationMargin = (pos1, pos2) => {
        let sign = '-=';
        if (pos1 > pos2) {
            let pos3 = pos1
            pos1 = pos2
            pos2 = pos3
        }
        let val = (pos2 - pos1)
        return sign + (2*val) + '00%'
    }

    let img = portrait1
    portraitBorder.css('grid-column', img.css('grid-column'))
    portraitBorder.css('margin-top', '-'+img.css('height'))
    
    portrait1.click(function(){ moveTo(1) });
    portrait2.click(function(){ moveTo(2) });
    portrait3.click(function(){ moveTo(3) });

    return { getAnimationMargin, moveTo, getPos }
}

module.exports = menuFactions