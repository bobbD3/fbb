
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
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
       

            // Show back to top button
            $("#back-to-top").fadeIn();
            // Show back to top button
            $("#back-to-top-phone").fadeIn();

            $("#back-to-top-mail").fadeIn();

        } else {



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


/* ===============================================
                pop up 
=================================================*/
const openPopupButtons = document.querySelectorAll('[data-popup-target]')
const closePopupButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = document.querySelector(button.dataset.popupTarget)
        openPopup(popup)
       
    })
})

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active')
    popups.forEach(popup => {
        closePopup(popup)
    })
  })
closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup')
        closePopup(popup)
    })
})

function openPopup(popup){
    if (popup == null) return 
    popup.classList.add('active')
    overlay.classList.add('active')
}

function closePopup(popup){
    if (popup == null) return 
    popup.classList.remove('active')
    overlay.classList.remove('active')
}

/* =========================================
              Google Map
============================================ */
$(window).on('load', function () {

    // Map Variables
    var addressString = 'Academica Gym, ulitsa "Academic Rostislav Kaishev", Sofia';
    var myLatlng = {
        lat: 42.675790,
        lng: 23.364940
        
    };
    
    // 1. Render Map
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatlng,
        styles: [
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f7f1df"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#d0e3b4"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fbd3da"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#bde6ab"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffe15f"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#efd151"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "black"
                    }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#cfb2db"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#a2daf2"
                    }
                ]
            }
        ]
    });

    // 2. Add Marker
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Заповядайте при нас"
        
    });

    // 3. Add Info Window
    var infowindow = new google.maps.InfoWindow({
        content: addressString
    });

    // Show info window when user clicks marker
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    // 4. Resize Function
    google.maps.event.addDomListener(window, 'resize', function () {

        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);

    });

    // 5. Change Marker Icon

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: iconBase + 'parking_lot_maps.png'
  });

});
