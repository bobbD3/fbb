
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
        console.log("1")
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
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#1a0c32"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "gamma": 0.01
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": -31
                    },
                    {
                        "lightness": -33
                    },
                    {
                        "weight": 2
                    },
                    {
                        "gamma": 0.8
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 30
                    },
                    {
                        "saturation": 30
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "18"
                    },
                    {
                        "lightness": "-15"
                    },
                    {
                        "gamma": "0.86"
                    },
                    {
                        "color": "#280768"
                    },
                    {
                        "weight": "1.26"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#a28ddf"
                    },
                    {
                        "saturation": "50"
                    },
                    {
                        "lightness": "8"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#fffefe"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "saturation": 20
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 20
                    },
                    {
                        "saturation": -20
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 10
                    },
                    {
                        "saturation": -30
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#7d55e4"
                    },
                    {
                        "saturation": "-9"
                    },
                    {
                        "lightness": "-17"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "saturation": 25
                    },
                    {
                        "lightness": 25
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#dfc9fb"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#280a4c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": -20
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#5c2abc"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d0c9f9"
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
