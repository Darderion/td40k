
const TMap = require('./Map/Map')
const TDrawer = require('./DrawEngine')
const FMenu = require('./Menu')
const FMenuFactions = require('./MenuFactions')
const TMob = require('./Mob/Mob')
const FCastle = require('./Castle')
const FMobController = require('./Mob/MobController')
const FAdaptiveLayout = require('./AdaptiveLayout')
const FHealthBar = require('./HealthBar')
const FTileSelector = require('./TileSelector')
const FBuilder = require('./Builder')
const FFaction = require('./Faction')
const OData = require('./Data')
const FPlayer = require('./Player')
const FTowerSelector = require('./TowerSelector')
const TTile = require('./Map/Tile')

const DependencyInjector = function() {

    const defaultParams = {
        map : {
            width : 10,
            height : 10,
            tileSides : 6
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
        mob : {
            canvas : $('#canvasWrapper')[0],
            left : $('#canvasWrapper')[0].getBoundingClientRect().left,
            top : $('#canvasWrapper')[0].getBoundingClientRect().top,
        },
        adaptiveLayout : {
            screen : document.documentElement.clientHeight,
            canvasWrapper : $('#canvasWrapper'),
            separator : $('#separator'),
            Icons : $('.Icons'),
            btnPrepMenu : $('#btnPrepMenu'),
            healthBar : $('.hpBar'),
            healthBarBorder: $('#healthBarBorder'),
            canvasBackground : $('#canvasBackground'),
            canvasWalls : $('#canvasWalls'),
            playGroundWrapper: $('#playGroundWrapper'),
            buildMenu: $('#buildMenu')
        },
        towerSelector : {
            wrapper : $('#towerSelector'),
            numOfColumns : 3,
            numOfRows : 3,
            button : $('#buildMenuButton')
        },
        builder : {
            builderOverlayImage: $('#builderOverlayImage')[0]
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
            screenHeight = obj.adaptiveLayout.parameters.playScreenHeight,
            screenWidth = obj.adaptiveLayout.parameters.playScreenWidth,
            tileSides = defaultParams.map.tileSides) {
        const canvases = [
            defaultParams.adaptiveLayout.canvasBackground[0],
            defaultParams.adaptiveLayout.canvasWalls[0]
        ]
        return [canvases,map.maxX,map.maxY,screenWidth,screenHeight,map,tileSides]
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

    const getBuilderParams = function(
            map,
            players = [],
            buildSelector,
            tileWidth, tileHeight,
            builderOverlayImg = defaultParams.builder.builderOverlayImage,
            mapSelector = defaultParams.adaptiveLayout.canvasWalls) {
        let mapSelectorOverlay = new FTileSelector(mapSelector, map.maxX, map.maxY)
        let builderOverlayImageObject = {
            img: builderOverlayImg,
            tileWidth, tileHeight
        }
        return [mapSelectorOverlay, buildSelector, builderOverlayImageObject, players]
    }

    const getTowerSelectorParams = function(
            data,
            height,
            towerMenu = defaultParams.adaptiveLayout.buildMenu,
            towerGrid = defaultParams.towerSelector.wrapper) {
        let ts = new FTileSelector(towerGrid, 3, 3, null, height)
        return [...Object.values(defaultParams.towerSelector), towerMenu, ts, data]
    }

    const getMobClass = function(
            x = defaultParams.map.x,
            y = defaultParams.map.y,
            width = defaultParams.canvas.width / (x + 0.5),
            height = defaultParams.canvas.height / (y + 1),
            left = defaultParams.mob.left,
            top = defaultParams.mob.top,
            canvas = defaultParams.mob.canvas) {
        TMob.configure(width, height, left, top, canvas, x, y)
        return TMob
    }

    const getFactionClass = function(data) {
        FFaction.configure(data)
        return FFaction
    }

    const getPlayers = function(factions, players) {
        const Players = []
        players.forEach(player => {
            Players.push(new FPlayer(player.name, factions.getByName(player.faction)))
        })
        return Players;
    }

    const getTileClass = function(width, height) {
        TTile.configure(width, height)
        return TTile;
    }

    const configure = function(param = {}) {
        obj.map = new TMap(...((param.map) ?
            getMapParams(param.map.width, param.map.height):
            getMapParams()))
        obj.adaptiveLayout = new FAdaptiveLayout(...Object.values(defaultParams.adaptiveLayout))
        obj.drawer = new TDrawer(...((param.drawer) ?
            getDrawEngineParams(param.drawer.map):
            getDrawEngineParams()))
        obj.menu = new FMenu(...Object.values(defaultParams.menu))
        obj.menuFactions = new FMenuFactions(...Object.values(defaultParams.menuFactions))
        obj.Mob = getMobClass(
            obj.map.maxX,
            obj.map.maxY,
            obj.adaptiveLayout.parameters.playScreenWidth / (obj.map.maxX + 0.5),
            obj.adaptiveLayout.parameters.playScreenHeight / (obj.map.maxY + 1)
            )
        obj.hpBar = new FHealthBar(obj.adaptiveLayout.parameters.healthBarWidth)
        obj.castle = new FCastle(obj.hpBar)
        obj.mobController = new FMobController(obj.map, obj.castle)
        obj.Factions = getFactionClass(OData.Factions)
        obj.players = getPlayers(obj.Factions, param.players)
        obj.towerSelector = new FTowerSelector(...getTowerSelectorParams(
            OData, obj.adaptiveLayout.parameters.playScreenHeight))
        obj.Tile = getTileClass(
            obj.adaptiveLayout.parameters.playScreenWidth / (obj.map.maxX + 0.5),
            obj.adaptiveLayout.parameters.playScreenHeight / (obj.map.maxY + 1)
            )
        obj.builder = new FBuilder(
            ...getBuilderParams(
                obj.map,
                obj.players,
                obj.towerSelector,
                obj.Tile.width,
                obj.Tile.height
            )
        )
    }

    const getObjects = function() {
        return obj;
    }

    return { configure, getObjects }
}

module.exports = DependencyInjector