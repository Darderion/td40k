
const TMap = require('./Map')
const TDrawer = require('./DrawEngine')
const FMenu = require('./Menu')
const FMenuFactions = require('./MenuFactions')
const FAdaptiveLayout = require('./AdaptiveLayout')

const DependencyInjector = function() {

    const defaultParams = {
        map : {
            width : 10,
            height : 10
        },
        menu : {
            btnPrevious : $('#btnPrevious'),
            btnNext : $('#btnNext'),
            btnAbout : $('#btnAbout'),
            btnPlay : $('#btnPlay'),
            btnPlayMenu : $('#btnPlayMenu'),
            btnPrepMenu : $('#btnPrepMenu'),
            btnPreparation : $('#btnPreparation')
        },
        menuFactions : {
            portraitBorder : $('#portraitBorder'),
            portrait0 : $('#portrait0'),
            portrait1 : $('#portrait1'),
            portrait2 : $('#portrait2'),
            portrait3 : $('#portrait3'),
            portrait4 : $('#portrait4'),
            skipArrowsLeft : $('#skipArrowsLeft'),
            skipArrowsRight : $('#skipArrowsRight')
        },
        adaptiveLayout : {
            screen : document.documentElement.clientHeight,
            canvasWrapper : $('#canvasWrapper'),
            separator : $('#separator'),
            Icons : $('.Icons'),
            btnPrepMenu : $('#btnPrepMenu')
        }
    }

    const obj = {
        map : {},
        drawer : {},
        menu : {},
        menuFactions : {}
    }
 
    const getDrawEngineParams = function(
            map = obj.map,
            screenHeight = obj.adaptiveLayout.canvasHeight,
            screenWidth = obj.adaptiveLayout.canvasWidth) {
        const canvases = [
            document.getElementById('canvasBackground'),
            document.getElementById('canvasWalls')
        ]
        return [canvases,map.tiles.length,map.tiles[0].length,screenWidth,screenHeight,map]
    }

    const getMapParams = function(width = defaultParams.map.width, height = defaultParams.map.height) {
        return [width, height]
    }

    const getMenuParams = function(
            btnPrevious = defaultParams.menu.btnPrevious,
            btnNext = defaultParams.menu.btnNext,
            btnAbout = defaultParams.menu.btnAbout,
            btnPlay = defaultParams.menu.btnPlay,
            btnPlayMenu = defaultParams.menu.btnPlayMenu,
            btnPrepMenu = defaultParams.menu.btnPrepMenu,
            btnPreparation = defaultParams.menu.btnPreparation) {
        return [btnPrevious, btnNext, btnAbout, btnPlay, btnPlayMenu, btnPrepMenu, btnPreparation]
    }

    const configure = function(param = {}) {
        obj.map = new TMap(...((param.map != null) ?
            getMapParams(param.map.width, param.map.height):
            getMapParams()))
        obj.adaptiveLayout = FAdaptiveLayout(...Object.values(defaultParams.adaptiveLayout))
        obj.drawer = new TDrawer(...((param.drawer != null) ?
            getDrawEngineParams(param.drawer.map):
            getDrawEngineParams()))
        obj.menu = FMenu(...Object.values(defaultParams.menu))
        obj.menuFactions = FMenuFactions(...Object.values(defaultParams.menuFactions))
    }

    const getObjects = function() {
        return obj;
    }

    return { configure, getObjects }
}

module.exports = DependencyInjector