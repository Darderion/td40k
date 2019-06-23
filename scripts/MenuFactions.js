
const menuFactions = () => {

    let curPos = 1

    const getPos = () => curPos

    const moveTo = (pos) => {
        border.animate(
            (pos > curPos) ?
                { 'margin-right': getAnimationMargin(curPos, pos) } :
                { 'margin-left' : getAnimationMargin(curPos, pos)},
            500, function() {
                border.css('grid-column',pos)
                border.css('margin-right','0')
                border.css('margin-left','0')
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

    let border = $('#portraitBorder')
    let img = $('#portrait1')
    border.css('grid-column', img.css('grid-column'))
    border.css('margin-top', '-'+img.css('height'))
    
    $("#portrait1").click(function(){ moveTo(1) });
    $("#portrait2").click(function(){ moveTo(2) });
    $("#portrait3").click(function(){ moveTo(3) });

    return { getAnimationMargin, moveTo, getPos }
}

module.exports = menuFactions