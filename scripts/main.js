
$(document).ready( function() {

    $('#play').hide()

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
        $('#menu').toggle()
        $('#play').toggle()
    })
    $('#btnMenu').click(function() {
        $('#menu').toggle()
        $('#play').toggle()
    })
})