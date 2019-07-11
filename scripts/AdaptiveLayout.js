
adaptiveLayout = function(screen,canvasWrapper,separator,Icons,btnPrepMenu,healthBar,healthBarBorder,canvasBackground,canvasWalls) {
    const border = 769;
    let parameters;

    if (screen < border) {
        parameters = {
            canvasWidth : 1000,
            canvasHeight : 580,
            separatorWidth : 1300,
            IconsWidth : 70,
            btnPrepMenuWidth : 150,
            healthBarWidth : 975,
            healthBarBorderWidth : 1000,
            healthBarsMargin : 7.3,
            healthBarBorderMargin : 6.6,
            healthBarBorderSolid : 19
        }
    } else {
        parameters = {
            canvasWidth : 1200,
            canvasHeight : 800,
            separatorWidth : 1500,
            IconsWidth : 98,
            btnPrepMenuWidth : 200,
            healthBarWidth : 1175,
            healthBarBorderWidth : 1200,
        }
    }
    canvasWrapper.css('width', parameters.canvasWidth + 'px');
    canvasWrapper.css('height', parameters.canvasHeight + 'px');
    canvasBackground.width(parameters.canvasWidth + 'px');
    canvasBackground.height(parameters.canvasHeight + 'px');
    canvasWalls.width(parameters.canvasWidth + 'px');
    canvasWalls.height(parameters.canvasHeight + 'px');
    separator.css('width', parameters.separatorWidth);
    Icons.css('width', parameters.IconsWidth + '%');
    btnPrepMenu.css('width',parameters.btnPrepMenuWidth +'px');
    healthBarBorder.css('width',parameters.healthBarBorderWidth);
    healthBar.css('margin-left',parameters.healthBarsMargin +'%');
    healthBarBorder.css('margin-left',parameters.healthBarBorderMargin +'%');
    healthBarBorder.css('border','solid ' + parameters.healthBarBorderSolid +'px black' )
    return { parameters }
}
 
module.exports = adaptiveLayout

