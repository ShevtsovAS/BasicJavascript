$(function () {
    $('#button').click(function () {
        $.get(
            'http://apilayer.net/api/latest',
            {'access_key': '806525fcc6b0cb4bd28e8fc3dc6aec8b'},
            function (response) {
                var usd = 'USD: ' + (response.rates.RUB / response.rates.USD).toFixed(2);
                var eur = 'EUR: ' + (response.rates.RUB / response.rates.EUR).toFixed(2);
                $('#kurs')
                    .html('')
                    .append($('<h4></h4>').text('Курс валют:'))
                    .append($('<p></p>').text(usd))
                    .append($('<p></p>').text(eur));
            });
    });

    $('#btn1').click(function () {
        $('#popup-container').fadeIn(400, disableScroll());
        $('#popup').animate({
            width: '300px',
            height: '400px'
        }, 400);
    });

    $('#popup-container').click(function (event) {
        if (event.target == this) {
            $(this).fadeOut(400, enableScroll());
            $('#popup').animate({
                width: 0,
                height: 0
            }, 400);
        }
    });

    setInterval(getCurrentDateTime, 200);
});

function disableScroll() {
    $html = $('html');
    $body = $('body');
    var initWidth = $body.outerWidth();
    var initHeight = $body.outerHeight();

    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    $html.data('scroll-position', scrollPosition);
    $html.data('previous-overflow', $html.css('overflow'));
    $html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    var marginR = $body.outerWidth() - initWidth;
    var marginB = $body.outerHeight() - initHeight;
    $body.css({'margin-right': marginR, 'margin-bottom': marginB});
}

function enableScroll() {
    $html = $('html');
    $body = $('body');
    $html.css('overflow', $html.data('previous-overflow'));
    var scrollPosition = $html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    $body.css({'margin-right': 0, 'margin-bottom': 0});
}

function getCurrentDateTime() {
    var currentDateTime = new Date();
    var day = currentDateTime.getUTCDate();
    var month = currentDateTime.getMonth() + 1;
    var year = currentDateTime.getFullYear();
    var hour = currentDateTime.getHours();
    var minutes = currentDateTime.getMinutes();
    var seconds = currentDateTime.getSeconds();

    var time = '';
    time += hour < 10 ? '0' + hour : hour;
    time += ':';
    time += minutes < 10 ? '0' + minutes : minutes;
    time += ':';
    time += seconds < 10 ? '0' + seconds : seconds;

    var date = '';
    date += day < 10 ? '0' + day : day;
    date += '.';
    date += month < 10 ? '0' + month : month;
    date += '.';
    date += year;

    $('#datetime').text(date + ' ' + time);
}




