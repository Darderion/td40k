
const TMap = require('./Map')
const map = new TMap(10,10);
map.tiles[5][2].setBarrier(3,false);

const TDrawer = require('./DrawEngine');

const FMenuFactions = require('./MenuFactions')

$(document).ready( function() {
    const MenuFactions = FMenuFactions()
    const canvas = document.getElementById('playGround') 
    const drawer = TDrawer(canvas,map.tiles[0].length,map.tiles.length,1300,800,map);
    drawer.draw();

    const states = [ 'menu', 'play', 'prep' ]

    const switchTo = function(id) {
        states.forEach((el) => $('#'+el).hide())
        $('#'+id).slideDown()
    }

    switchTo('NoID')

    let background = function() {
        let cur = 0
        const arr = [
            "ImperialGuards",
            "Orcs",
            "Necrons",
            "SpaceMarines"
        ]
        const n = arr.length;

        const update = function() {
            $('body').css('background','url(img/'+img()+'.jpg) no-repeat')
            $('body').css('background-size','100%')
            $('body').css('background-color','black')
        }
        const img = () => arr[cur]
        const next = function() {
            cur = (cur + 1) % n;
            update()
        }
        const prev = function() {
            cur = (cur) ? (cur - 1) % n : (n-1)
            update()
        }

        return { img, next, prev, update }
    } ()

    background.update()

    $('#btnPrevious').click(function() {
        background.prev()
    })
    $('#btnNext').click(function() {
        background.next()
    })
    $('#btnAbout').click(function() {
        alert('An awESOme Game created for da boiiiiz')
    })
    $('#btnPlay').click(function() {
        switchTo('play')
    })
    $('#btnPlayMenu').click(function() {
        switchTo('menu')
    })
    $('#btnPrepMenu').click(function() {
        switchTo('menu')
    })
    $('#btnPreparation').click(function() {
        switchTo('prep')
    })

    switchTo('menu')
})