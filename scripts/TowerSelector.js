
const towerSelector = function(wrapper, numOfColumns, numOfRows, button, towerMenu, tileSelector, data) {
    const params = { wrapper,numOfColumns,numOfRows, button, towerMenu, tileSelector, data }
    let animateLock = false;
    wrapper.css('display','grid')
    wrapper.css('grid-template-columns','repeat('+numOfColumns+',1fr)');
    wrapper.css('grid-template-rows','repeat('+numOfRows+',1fr)');

    let numOfDivs = numOfColumns*numOfRows;
    for (let i = 0; i < numOfDivs; i++) {
        let img = document.createElement('img');
        img.className = 'towerImg'
        img.id = 'towerSelector'+i;
        img.src = './img/menuIMG/towerButton.png'
        wrapper[0].appendChild(img);
    }
    const images = $('.towerImg')
    
    const toggle = () => {
        if(animateLock === false) {
            animateLock = true;
            images.css('padding', 25 + '%')
            
            towerMenu.animate({
                    'height' : (Number.parseInt(params.towerMenu.css('height'))) ? 0 + 'px' : 800 + 'px',
                }, 500,
                () => {
                    images.css('padding', (Number.parseInt(params.towerMenu.css('height'))) ? 25 + '%' : 0 + '%')
                    animateLock = false;
                })
        }
    }
    button.click(toggle)

    return { toggle }
}

module.exports = towerSelector
