
towerSelector = function(numOfColumns, numOfRows, wrapper) {

    wrapper.css('display','grid')
    wrapper.css('grid-template-columns','repeat('+numOfColumns+',1fr)');
    wrapper.css('grid-template-rows','repeat('+numOfRows+',1fr)');

    let numOfDivs = numOfColumns*numOfRows;
    for (let i = 0; i < numOfDivs; i++) {
        let div = document.createElement('div');
        div.id = 'towerSelector'+i;
        wrapper[0].appendChild(div);
    }
}


module.exports = towerSelector
