/*========================================
                Preloader
/*=======================================*/
$(window).on('load', function () {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
});


/*========================================
                Responsive tabs
/*=======================================*/


$(function () {

    $("#about-tabs").responsiveTabs({
        animation: 'slide',
        smartSpeed: 300,
    });

});


/* =========================================
              Stats
============================================ */
$(function () {

    $(".counter").counterUp({
        delay: 10,
        time: 2000
    });

});

$(function () {

    $("a.smooth-scroll").click(function (event) {

        event.preventDefault();

        // get section id like #about, #servcies, #work, #team and etc.
        var section_id = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(section_id).offset().top - 64
        }, 1250, "easeInOutExpo");

    });

});

/* =========================================
              Navigation
============================================ */

/* Show & Hide White Navigation */
$(function () {

    // show/hide nav on page load
    showHideNav();

    $(window).scroll(function () {

        // show/hide nav on window's scroll
        showHideNav();
    });

    function showHideNav() {

        if ($(window).scrollTop() > 250) {

            // Show white nav
            // $("nav").addClass("white-nav-top");

        //    $("nav").addClass("bg-light");
        //    $(".nav-link").addClass("text-dark");
        

            // Show back to top button
            $("#back-to-top").fadeIn();
                        // Show back to top button
            $("#back-to-top-phone").fadeIn();

            $("#back-to-top-mail").fadeIn();

        } else {

            // Hide white nav
            // $("nav").removeClass("white-nav-top");

           $("nav").removeClass("bg-light");
           $(".nav-link").removeClass("text-dark");


            // Hide back to top button
            $("#back-to-top").fadeOut();
                        // Hide back to top button
            $("#back-to-top-phone").fadeOut();

            $("#back-to-top-mail").fadeOut();
        }
    }
});

// Smooth Scrolling
$(function () {

    $("a.smooth-scroll").click(function (event) {

        event.preventDefault();

        // get section id like #about, #servcies, #work, #team and etc.
        var section_id = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(section_id).offset().top - 64
        }, 1250, "easeInOutExpo");

    });

});


/* =========================================
                Animation
============================================ */
// animate on scroll
$(function () {
    new WOW().init();
});

/* Cookies*/

    if (localStorage.getItem('cookieSeen') != 'shown') {
        $('.cookie-banner').delay(2000).fadeIn();
        localStorage.setItem('cookieSeen','shown')
      };


$('.close').click(function() {
    $('.cookie-banner').fadeOut();
  })
/* =========================================
                Hover 
============================================ */
// var myAnimation = new hoverEffect({
//     parent: document.querySelector('.distortion'),
//     intensity: 0.3,
//     image1: "./img/Coaches/ivan/Functional Bodies19893.jpg",
//     image2: "./img/Coaches/ivan/Functional Bodies19868.jpg",
//     displacementImage: "./img/Coaches/img2.png"
// });