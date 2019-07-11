
const menuFactions = function(portraitBorder, portrait0, portrait1, portrait2, portrait3, portrait4, skipArrowsLeft, skipArrowsRight) {
    let curPos = 1;
    let portraitPos = 1;
    let lockForArrows = false;
    portrait0.css ('opacity','0');
    portrait4.css ('opacity','0');
    portrait0.css ('pointer-events','none');
    portrait4.css ('pointer-events','none');
    skipArrowsLeft.css ('z-index','2');
    skipArrowsRight.css ('z-index','2');
    portraitBorder.css('grid-column', curPos+1);
    let portraits = [ portrait0, portrait1, portrait2, portrait3, portrait4 ];
    const getPos = () => curPos

    const moveTo = (pos) => {
        if (lockForArrows == false) {
            portraitBorder.animate(
                (pos > curPos) ?
                    { 'margin-right': getAnimationMargin(curPos, pos)} :
                    { 'margin-left' : getAnimationMargin(curPos, pos)},
                500, () => {
                    portraitBorder.css('grid-column',pos+1)
                    portraitBorder.css('margin-right','0')
                    portraitBorder.css('margin-left','0')
                })
            curPos = pos;
        }
    }

    const getMargin = (isMarginRight, direction) => ((isMarginRight ? 1:-1) == direction) ? '-200%' : '0';

    const movePortraits = direction => {
        if (lockForArrows == false) {
            lockForArrows = true;
            portraits.forEach((element, index) => {
                element.animate({
                    'opacity' : (direction == 1) ? (index > 2) ? '0' : '1' : (index < 2) ? '0' : '1',
                    'margin-right': getMargin(true, direction),
                    'margin-left' : getMargin(false,direction)

                },
                500,
                    () => {
                    lockForArrows = false;
                    element.css({
                        'opacity' : (index == 0 || index == 4) ? '0' : '1',
                        'margin-right' : '0',
                        'margin-left'  : '0'
                    })
                })
            })
        }
    }

    const getAnimationMargin = (pos1, pos2) => {
        let sign = '-=';
        let val = Math.abs(pos2 - pos1)
        return sign + (2*val) + '00%'
    }

    let img = portrait1
    portraitBorder.css('margin-top', '-'+img.css('height'))
    portrait0.click(() => console.log('CLACK'));
    portrait1.click(() => moveTo(1));
    portrait2.click(() => moveTo(2));
    portrait3.click(() => moveTo(3));
    skipArrowsRight.click(() => movePortraits(1));
    skipArrowsLeft.click(() => movePortraits(-1));
    return { getPos }
}

module.exports = menuFactions
