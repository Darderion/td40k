
adaptiveLayout = function(screen,canvasWrapper,separator,Icons,btnPrepMenu) {

    const border = 769;
    let parameters;

    if (screen < border) {
        parameters = {
            canvasWidth : 1000,
            canvasHeight : 580,
            separatorWidth : 1300,
            IconsWidth : 70,
            btnPrepMenuWidth : 150
            }
    } else {
        parameters = {
            canvasWidth : 1300,
            canvasHeight : 800,
            separatorWidth : 1500,
            IconsWidth : 98,
            btnPrepMenuWidth : 200
        }
    }
    console.log(parameters)
    console.log(canvasWrapper)
    canvasWrapper.css('width', parameters.canvasWidth);
    canvasWrapper.css('height', parameters.canvasHeight);
    separator.css('width', parameters.separatorWidth);
    Icons.css('width', parameters.IconsWidth + '%');
    btnPrepMenu.css('width',parameters.btnPrepMenuWidth +'px')
    
    return parameters
}

module.exports = adaptiveLayout

