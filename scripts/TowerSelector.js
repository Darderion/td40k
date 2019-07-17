
const towerSelector = function(wrapper,numOfColumns,numOfRows,builder,button) {
    
    const params = { wrapper,numOfColumns,numOfRows,builder,button }

    wrapper.css('display','grid')
    wrapper.css('grid-template-columns','repeat('+numOfColumns+',1fr)');
    wrapper.css('grid-template-rows','repeat('+numOfRows+',1fr)');

    let numOfDivs = numOfColumns*numOfRows;
    for (let i = 0; i < numOfDivs; i++) {
        let img = document.createElement('img');
        img.id = 'towerSelector'+i;
        img.src = './img/menuIMG/towerButton.png'
        wrapper[0].appendChild(img);
    }
    
    const toggle = () => builder.animate({
        'height' : !params.builder[0].height ? 800 + 'px' : 0 + 'px'
    }, 500)
    
    button.click(toggle)

    return { toggle }
}

module.exports = towerSelector
