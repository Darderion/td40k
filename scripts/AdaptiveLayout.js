
adaptiveLayout = function(screen,canvasWrapper,separator,Icons,btnPrepMenu,healthBar,healthBarBorder,canvasBackground,canvasWalls,playGroundWrapper,buildMenu) {
    const border = 769;
    let parameters;

    if (screen < border) {
        parameters = {
            playScreenWidth : 1000,
            playScreenHeight : 580,
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
            playScreenWidth : 1200,
            playScreenHeight : 800,
            separatorWidth : 1500,
            IconsWidth : 98,
            btnPrepMenuWidth : 200,
            healthBarWidth : 1175,
            healthBarBorderWidth : 1200,
        }
    }
    playGroundWrapper.width(parameters.playScreenWidth + 'px')
    playGroundWrapper.height(parameters.playScreenHeight + 'px')
    buildMenu.width(parameters.playScreenWidth + 'px')
    //towerInfo.height(parameters.playScreenHeight + 'px')
    buildMenu.height("0")
    canvasWrapper.width(parameters.playScreenWidth + 'px');
    canvasWrapper.height(parameters.playScreenHeight + 'px');
    canvasBackground.width(parameters.playScreenWidth + 'px');
    canvasBackground.height(parameters.playScreenHeight + 'px');
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

