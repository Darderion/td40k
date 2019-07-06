
const TMap = require('./Map')
const TDrawer = require('./DrawEngine')
const FMenu = require('./Menu')
const FMenuFactions = require('./MenuFactions')
const TMob = require('./Mob')

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
            portrait1 : $('#portrait1'),
            portrait2 : $('#portrait2'),
            portrait3 : $('#portrait3')
        },
        mob : {
            canvas : $('#canvasWrapper')[0],
            left : $('#canvasWrapper')[0].getBoundingClientRect().left,
            top : $('#canvasWrapper')[0].getBoundingClientRect().top,
        },
        canvas : {
            width : 1300,
            height: 800
        }
    }

    const obj = {
        map : {},
        drawer : {},
        menu : {},
        menuFactions : {}
    }

    const getDrawEngineParams = function(map = obj.map) {
        const canvases = [
            document.getElementById('canvasBackground'),
            document.getElementById('canvasWalls')
        ]
        return [canvases,map.maxX,map.maxY,defaultParams.canvas.width,defaultParams.canvas.height,map]
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

    const getMobClass = function(
            x = defaultParams.map.x,
            y = defaultParams.map.y,
            width = defaultParams.canvas.width / x,
            height = defaultParams.canvas.height / y,
            left = defaultParams.mob.left,
            top = defaultParams.mob.top,
            canvas = defaultParams.mob.canvas) {
        TMob.configure(width, height, left, top, canvas, x, y)
        return TMob
    }

    const configure = function(param = {}) {
        obj.map = new TMap(...((param.map != null) ?
            getMapParams(param.map.width, param.map.height):
            getMapParams()))
        obj.drawer = new TDrawer(...((param.drawer != null) ?
            getDrawEngineParams(param.drawer.map):
            getDrawEngineParams()))
        obj.menu = FMenu(...Object.values(defaultParams.menu))
        obj.menuFactions = FMenuFactions(...Object.values(defaultParams.menuFactions))
        obj.Mob = getMobClass(
            obj.map.maxX,
            obj.map.maxY
        )
    }

    const getObjects = function() {
        return obj;
    }

    return { configure, getObjects }
}

module.exports = DependencyInjector