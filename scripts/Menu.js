
const Menu = function(btnPrevious, btnNext, btnAbout, btnPlay, btnPlayMenu, btnPrepMenu, btnPreparation) {

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
            $('body').css('background',`'url(img/${img()}.jpg) no-repeat`)
            $('body').css('background-size','100%')
            $('body').css('background-color','black')
        }
        const img = _ => arr[cur]
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

    const states = [ 'menu', 'play', 'prep' ]
    const switchTo = function(id) {
        states.forEach(el => $(`#${el}`).hide())
        $(`#${id}`).slideDown()
    }

    btnPrevious.click(function() {
        background.prev()
    })
    btnNext.click(function() {
        background.next()
    })
    btnAbout.click(function() {
        alert('An awESOme Game created for da boiiiiz')
    })
    btnPlay.click(function() {
        switchTo('play')
    })
    btnPlayMenu.click(function() {
        switchTo('menu')
    })
    btnPrepMenu.click(function() {
        switchTo('menu')
    })
    btnPreparation.click(function() {
        switchTo('prep')
    })
    return { switchTo, background }
}

module.exports = Menu