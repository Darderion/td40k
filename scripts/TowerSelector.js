
const towerSelector = function(wrapper, numOfColumns, numOfRows, button, towerMenu, tileSelector, data) {
    const params = { wrapper,numOfColumns,numOfRows, button, towerMenu, tileSelector, data }
    let animateLock = false;
    wrapper.css('display','grid')
    wrapper.css('grid-template-columns',`repeat(${numOfColumns},1fr)`);
    wrapper.css('grid-template-rows',`'repeat(${numOfRows},1fr)`);

    let numOfDivs = numOfColumns*numOfRows;
    for (let i = 0; i < numOfDivs; i++) {
        let img = document.createElement('img');
        img.className = 'towerImg'
        img.id = `towerSelector${i}`;
        img.src = './img/menuIMG/towerButton.png'
        wrapper[0].appendChild(img);
    }
    const images = $('.towerImg')
    
    const toggle = faction => {
        setFaction(faction)
        if (animateLock === false) {
            animateLock = true;
            images.css('padding', '5%')
            
            towerMenu.animate({
                    'height' : (Number.parseInt(params.towerMenu.css('height'))) ? '0' : '800px',
                }, 500,
                () => {
                    images.css('padding', (Number.parseInt(params.towerMenu.css('height'))) ? '5%' : '0')
                    animateLock = false;
                })
        }
    }
    
    const onClick = tileSelector.onClick;
    let curFaction = undefined;

    const setFaction = faction => {
        if (!faction || curFaction == faction) return;
        curFaction = faction;
        for(let i = 0; i < numOfDivs; i++) {
            $(`#towerSelector${i}`)[0].src = faction.towers[i].img.src;
            //$(`#towerSelector${i}`)[0].style.width = "250px";
            //$(`#towerSelector${i}`)[0].style.height = "250px";
        }
    }

    return { toggle, onClick, setFaction, button }
}

module.exports = towerSelector
