
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
    const onClick = tileSelector.onClick;
    let curFaction = undefined;

    const setFaction = faction => {
        if (curFaction == faction) return;
        curFaction = faction;
        for(let i = 0; i < numOfDivs; i++) {
            //$('body').append(
            //    faction.towers[i].img
            //)
            console.log(faction.towers[i])
            $(`#towerSelector${i}`)[0].src = faction.towers[i].img.src;
        }
    }

    return { toggle, onClick, setFaction }
}

module.exports = towerSelector
