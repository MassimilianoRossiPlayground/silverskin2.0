
// HOME

if( $('.template-index').length )  {
    if( $('.container-sliders_markers').length )  {
        // SWIPER  - homepage markers
        var swiper_left = new Swiper('.swiper-container.container-left', {
            touchRatio: 0.1,
            fadeEffect: {
                crossFade: true
            },
            onSlideChangeStart: function (e, swiper) {
                console.log(swiper.touches.diff); //should be not empty in this case
            }
        });
        var swiper_right = new Swiper('.swiper-container.container-right', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
        });


        if (typeof swiper_left !== null) {
            swiper_left.controller.control = swiper_right;
        }
        if (typeof swiper_right !== null) {
            swiper_right.controller.control = swiper_left;
        }


        $(".home__specs__button__item[data-id='0']").on("click", function () {
            swiper_left.slideTo(0, 500, false);
        })
        $(".home__specs__button__item[data-id='1']").on("click", function () {
            swiper_left.slideTo(1, 500, false);
        })
        $(".home__specs__button__item[data-id='2']").on("click", function () {
            swiper_left.slideTo(2, 500, false);
        })

        swiper_left.on('slideChange', function () {
            console.log(swiper_left.activeIndex);
            $(".slide-active").removeClass("slide-active");
            $(".home__specs__button__item[data-id='" + swiper_left.activeIndex + "']").addClass("slide-active");
            $(".slider-left_hover").removeClass("slider-left_visible");
            var height, bottom;
            switch(true){
                case swiper_left.activeIndex == 0 :
                    height = "30%";
                    bottom = "60%";
                break;
                case swiper_left.activeIndex == 1 :
                    height = "40%";
                    bottom = "30%";
                break;
                case swiper_left.activeIndex == 2 :
                    height = "50%";
                    bottom = "10%";
                break;
            }
            $(".home__specs__therm__mercury").css("height",height)
            $(".home__specs__therm__mercury").css("bottom",bottom)
        });


        $(".close-slide-hover").on("click", function () {
            $(".slider-left_hover").removeClass("slider-left_visible")
        })



        $(".hot-spot").on("click", function () {
            var pin = $(this).attr("data-id")
            $(".slider-left_hover").removeClass("slider-left_visible")
            $(".slider-left_hover[slider-hover='" + pin + "']").addClass("slider-left_visible")
        })

        if ( $(window).width() <= 768 ) {
            console.log("mob")
            $(".slider-navigation-specs").appendTo(".container-right")
        }
    }

    $(".video-yt-home-cover i").on("click", function(){
        
        $(this).addClass("hide")
        $(".video-yt-home-cover__img").addClass("hide")

        var video_home_yt = '<iframe class="home-yt" width="100%" height="800" src="https://www.youtube.com/embed/wUW0prhrh3I?fs=1&autoplay=1&mute=1&loop=1" title="Silverskin YouTube video player" frameborder="0" allowfullscreen></iframe>'
        $(".video-yt-home-cover").html(video_home_yt)
    })

    $( document ).ready(function() {
        if ( $(window).width() < 768 ) {
            $(".video-yt-home-cover").html('<iframe class="home-yt-mob" width="100%" height="400" src="https://www.youtube.com/embed/wUW0prhrh3I?fs=1&autoplay=1&mute=1&loop=1" title="Silverskin YouTube video player" frameborder="0" allowfullscreen></iframe>')
        }
    });
    
   


}

// Modal Chi Siamo
$(".testing__col__media__play").on("click", function(){
    console.log("video showwww")
    $(".sil-modal.modal-video").removeClass("hidden")
    $(".sil-modal.modal-video").addClass("show")
})
$(".sil-modal .close-modal").on("click", function(){
    $(".sil-modal.modal-video").addClass("hidden")
    $(".sil-modal.modal-video").removeClass("show")
})
$('.sil-modal:not(.sil-modal .modal-video__content)').click(function(){
    $(".sil-modal.modal-video").addClass("hidden")
    $(".sil-modal.modal-video").removeClass("show")
})

function scroll_to_contacts() {
    setTimeout(function(){ 
        var $scrollTo = $('.form-vertical');
        var offTop = $scrollTo.offset().top - 230;
        $(window).scrollTop(offTop);
     }, 500);

}
if ( window.location.hash.substr(1) == "contattaci" ) {
    scroll_to_contacts()

}

$(".site-nav__item a[href='/pages/chi-siamo#contattaci']").on("click", function(){
    scroll_to_contacts()
})

$(".mobile-nav a[href='/pages/chi-siamo#contattaci']").on("click", function(){
    $(".drawer__close button").trigger("click")
    scroll_to_contacts()
})

var ann_i = 1
var ann_j = 2
var ann_temp = ann_i

setInterval(function() {

    $(".announcement-text-left__"+ann_i).addClass("hidden")
    $(".announcement-text-left__"+ann_j).removeClass("hidden")

    ann_temp = ann_i
    ann_i = ann_j
    ann_j = ann_temp

}, 5000);
 

function modify_left_margin_navigation_swiper_home() {
    var left_elem = $(".home__specs__col__content-slide__wrapper").offset().left;
    $(".swiper-pagination").css("left", left_elem)

}

if ($(".container-sliders_markers").length) {

    window.onresize = function(event) {
        modify_left_margin_navigation_swiper_home()
    };
    
    $( document ).ready(function() {
        modify_left_margin_navigation_swiper_home()
    });
}


$( document ).ready(function() {
    
    $(".variant-input:nth-child(1) label").addClass("variant-selected")

    $(".variant-input label").on("click", function(){
        $(".variant-input label").removeClass("variant-selected")
        $(this).addClass("variant-selected")

        //change variant name in variant label (only on async call)
        $(".variant__label-selected").text(" - " + $(this).parent().attr("data-value"));
    })


});

// PDP Calze
$( document ).ready(function() {
    var swiper_banner_pdp_calze = new Swiper(".socks-banner-slider", {
        pagination: {
        el: ".socks-banner-slider .swiper-pagination",
        type: "fraction",
        },
        navigation: {
        nextEl: ".socks-banner-slider .swiper-button-next",
        prevEl: ".socks-banner-slider .swiper-button-prev",
        },
    });
});


//PDP 

$(".trustpilot-product-mini").on("click", function (event) {


    $('html,body').animate({
        scrollTop: $('#trustpilot-accordion').offset().top - 150
    }, 'slow');

    $("#trustpilot-accordion").addClass("active")

    $("#trustpilot-accordion + .panel").css("display","block")

})




// TECHNOLOGY

function geSlideDataIndex(swipe){
    var activeIndex = swipe.activeIndex;
    var slidesLen = swipe.slides.length;
    if(swipe.params.loop){
        switch(swipe.activeIndex){
            case 0:
                activeIndex = slidesLen-3;
                break;
            case slidesLen-1:
                activeIndex = 0;
                break;
            default:
                --activeIndex;
        }
    }
    return  activeIndex;
}

if( $('.page-technology-template').length )  {
    var technology_swiper = new Swiper(".technology-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 640px
            991: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
    });


    // Section interactive
    $(".interactive-banner__image__pin").on("click", function(){

        var attr_pin = $(this).attr("attr-pin")

        $(".interactive-banner__image__pin").removeClass("open")
        $(".interactive-banner__line").removeClass("open")
        $(".interactive-banner__info").removeClass("open")

        if ( !$(this).hasClass("open") ) {

            var attr_open = $(this).attr("attr-open")
            $(this).attr("src",attr_open)

            $(this).addClass("open")

            $(".interactive-banner__line[attr-pin='"+attr_pin+"']").addClass("open")
            $(".interactive-banner__info[attr-pin='"+attr_pin+"']").addClass("open")

        } else {

            console.log("chiudi: "+attr_close)

            var attr_close = $(this).attr("attr-close")
            $(this).attr("src",attr_close)

            $(this).removeClass("open")
            $(".interactive-banner__line[attr-pin='"+attr_pin+"']").removeClass("open")
            $(".interactive-banner__info[attr-pin='"+attr_pin+"']").removeClass("open")
        }

        if ($(window).width() <= 768) {
            if ($('.interactive-banner__info.open')) {
            $('html,body').animate({
                    scrollTop: $('.interactive-banner__info.open').offset().top - 100
                },'slow');
            }
        }

    })

    $(".tech-scroll-down").on("click", function(){
        $('html,body').animate({
            scrollTop: $('.section-interactive').offset().top - 100
        },'slow');
    })

    $(".termich-test-img").on("click", function(){
        $(".termich-test-iframe").removeClass("hide")
        $(".termich-test-iframe").attr('src', $(".termich-test-iframe").attr('src') + '&autoplay=1');
        $(this).addClass("hide")
    })

}




// PAGE COLLECTIONS

if( $('.page-collections-template').length )  {

    var swiper_collections_claim = new Swiper(".discover-swiper .swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: ".discover-swiper .swiper-pagination",
        }
      });

      $(".collections-slider-large").each(function(index, colSlider) {

            var colSliderTye = $(this).attr("attr-typecol")


                var swiper_left = new Swiper('#section-'+colSliderTye+'-collection .swiper-container.container-left', {
                    touchRatio: 0.1,
                  autoHeight: true,  
                  fadeEffect: {
                        crossFade: true
                    },
                    onSlideChangeStart: function (e, swiper) {
                        console.log(swiper.touches.diff); //should be not empty in this case
                    }
                });
                var swiper_right = new Swiper('#section-'+colSliderTye+'-collection .swiper-container.container-right', {
                  autoHeight: true,  
                  navigation: {
                        nextEl: '#section-'+colSliderTye+'-collection .container-sliders_markers .swiper-button-next',
                        prevEl: '#section-'+colSliderTye+'-collection .container-sliders_markers .swiper-button-prev',
                    },
                    pagination: {
                        el: '#section-'+colSliderTye+'-collection .container-sliders_markers .swiper-pagination',
                        clickable: true
                    },
                });
            
            
                if (typeof swiper_left !== null) {
                    swiper_left.controller.control = swiper_right;
                }
                if (typeof swiper_right !== null) {
                    swiper_right.controller.control = swiper_left;
                }
            
            
                $("#section-"+colSliderTye+"-collection .home__specs__button__item[data-id='0']").on("click", function () {
                    swiper_left.slideTo(0, 500, false);
                })
                $("#section-"+colSliderTye+"-collection .home__specs__button__item[data-id='1']").on("click", function () {
                    swiper_left.slideTo(1, 500, false);
                })
                $("#section-"+colSliderTye+"-collection .home__specs__button__item[data-id='2']").on("click", function () {
                    swiper_left.slideTo(2, 500, false);
                })
            
                swiper_left.on('slideChange', function () {
                    console.log(swiper_left.activeIndex);
					

                    $("#section-"+colSliderTye+"-collection .slide-active").removeClass("slide-active");            
                    $("#section-"+colSliderTye+"-collection .home__specs__button__item[data-id='" + swiper_left.activeIndex + "']").addClass("slide-active");
                    $("#section-"+colSliderTye+"-collection .slider-left_hover").removeClass("slider-left_visible")
                    var height, bottom;
                    switch(true){
                        case swiper_left.activeIndex == 0 :
                            height = "30%";
                            bottom = "60%";
                        break;
                        case swiper_left.activeIndex == 1 :
                            height = "40%";
                            bottom = "30%";
                        break;
                        case swiper_left.activeIndex == 2 :
                            height = "50%";
                            bottom = "10%";
                        break;
                    }
                    $("#section-"+colSliderTye+"-collection .home__specs__therm__mercury").css("height",height);
                    $("#section-"+colSliderTye+"-collection .home__specs__therm__mercury").css("bottom",bottom);
                });
            
            
                $("#section-"+colSliderTye+"-collection .close-slide-hover").on("click", function () {
                    $("#section-"+colSliderTye+"-collection .slider-left_hover").removeClass("slider-left_visible");
                })
            
            
            
                $("#section-"+colSliderTye+"-collection .hot-spot").on("click", function () {
                    var pin = $(this).attr("data-id")
                    $("#section-"+colSliderTye+"-collection .slider-left_hover").removeClass("slider-left_visible")
                    $("#section-"+colSliderTye+"-collection .slider-left_hover[slider-hover='" + pin + "']").addClass("slider-left_visible")
                })
            
                if ( $(window).width() <= 768 ) {
                    $("#section-"+colSliderTye+"-collection .slider-navigation-specs").appendTo("#section-"+colSliderTye+"-collection .container-right")
                    // solo per xwarm
                    $("#section-xwarm-collection .swiper-container.container-right").insertAfter("#section-xwarm-collection .fixed-content.only-mob")
                }
            

      })

    var collections_warm = new Swiper(".section-bestsellers--warm .technology-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".section-bestsellers--warm .technology-slider .swiper-button-next",
            prevEl: ".section-bestsellers--warm .technology-slider .swiper-button-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 640px
            991: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
    });
    var collections_warm = new Swiper(".section-bestsellers--xwarm .technology-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".section-bestsellers--xwarm .technology-slider .swiper-button-next",
            prevEl: ".section-bestsellers--xwarm .technology-slider .swiper-button-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 640px
            991: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
    });
    var collections_warm = new Swiper(".section-bestsellers--fresh .technology-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".section-bestsellers--fresh .technology-slider .swiper-button-next",
            prevEl: ".section-bestsellers--fresh .technology-slider .swiper-button-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 640px
            991: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
    });

    


    // FAQ Accordion


    $(".faq-acc-single__head").on("click", function(){
        if( $(this).parent().hasClass("opened") ) {
            $(this).parent().removeClass("opened")
        } else {
            $(this).parent().addClass("opened")      
        }
    })

    //  Hero sroll collections
    $(".col-collection--warm").on("click", function (){
        console.log("scrolllll")
        if ($(window).width() < 960) {
            var offset_scroll = 130
        } else {
            var offset_scroll = 100
        }
        $('html, body').animate({
            scrollTop: $("#section-warm-collection").offset().top-offset_scroll
        }, 1500);
    });
    $(".col-collection--xwarm").on("click", function (){
        if ($(window).width() < 960) {
            var offset_scroll = 130
        } else {
            var offset_scroll = 100
        }
        $('html, body').animate({
            scrollTop: $("#section-xwarm-collection").offset().top-offset_scroll
        }, 1500);
    });
    $(".col-collection--fresh").on("click", function (){
        if ($(window).width() < 960) {
            var offset_scroll = 130
        } else {
            var offset_scroll = 100
        }
        $('html, body').animate({
            scrollTop: $("#section-fresh-collection").offset().top-offset_scroll
        }, 1500);
    });

    //  Hero sroll collections DESK
    // $(".col-collection__content--warm").click(function (){
    //     $('html, body').animate({
    //         scrollTop: $("#section-warm-collection").offset().top-100
    //     }, 1500);
    // });
    // $(".col-collection__content--xwarm").click(function (){
    //     $('html, body').animate({
    //         scrollTop: $("#section-xwarm-collection").offset().top-100
    //     }, 1500);
    // });
    // $(".col-collection__content--fresh").click(function (){
    //     $('html, body').animate({
    //         scrollTop: $("#section-fresh-collection").offset().top-100
    //     }, 1500);
    // });
  
    $(".scopri_collezioni").click(function (){
      	
      	if ($(window).width() < 960) {
      
          $('html, body').animate({
              scrollTop: $("#collections-block").offset().top+330
          }, 500);
        
        }else{
        
        $('html, body').animate({
              scrollTop: $("#collections-block").offset().top-20
          }, 500);
        
        }
     });
  




}




// Page About US

if( $('.page-aboutus-template').length )  {

    $(".page-aboutus-template .section-hero-banner i.fa-chevron-down").on("click", function(){
        $('html,body').animate({
            scrollTop: $('.section-whoweare').offset().top - 100
        },'slow');
    })
}



// Page Snow Neve

if( $('#shopify-section-page-snow-template').length )  {

    function snow_video_hero() {
        var video_hero_snow = document.createElement("VIDEO");
        if ($(window).width() > 768) {
            video_hero_snow.src = "https://cdn.shopify.com/s/files/1/0285/3706/1424/files/Video-Orizzontale.mp4?v=1640795054"
            var video_dekmob = "only-desk"
        } else {
            video_hero_snow.src = "https://cdn.shopify.com/s/files/1/0285/3706/1424/files/Video_Verticale.mp4?v=1640795054"
            var video_dekmob = "only-mob"
        }
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            video_hero_snow.autoplay = true;
        }
        video_hero_snow.addEventListener("loadeddata", function () {
            console.log("video load")
            $('.hero-snow video.'+video_dekmob).removeClass("hide");
            $('.hero-snow__img').addClass("hide");
        });
        video_hero_snow.onloadeddata = function () {
            console.log("video load")
            $('.hero-snow video.'+video_dekmob).removeClass("hide");
            $('.hero-snow__img').addClass("hide");
        };
    }
    $( document ).ready(function() {
        snow_video_hero()
    });
    $(window).resize(function() {
        snow_video_hero()
    });

    $(".hero-snow__content .fa-chevron-down").on("click", function(){
        $('html, body').animate({
            scrollTop: $("#section-textbanner-snow").offset().top - 90
        }, 500);
    })

    $(".banner-cta__link.scopri_collezioni").on("click", function(){
        $('html, body').animate({
            scrollTop: $("#section-bestseller-snow").offset().top - 90
        }, 500);
    })

    var swiper_snow_cards = new Swiper(".cards-slider .swiper-container", {
        slidesPerView: 3.5,
        spaceBetween: 30,
        navigation: {
            nextEl: ".slider-navigation-snow .swiper-button-next",
            prevEl: ".slider-navigation-snow .swiper-button-prev",
        },
        pagination: {
            el: "#slider-cards-snow .swiper-pagination",
        },
        breakpoints: {
            320: {
              slidesPerView: 1.3,
              spaceBetween: 20
            },
            768: {
                slidesPerView: 1.6,
                spaceBetween: 20
            },
            991: {
                slidesPerView: 2.5,
                spaceBetween: 30
            },
            1420: {
                slidesPerView: 3.5,
                spaceBetween: 30
            },
        }
    });

    let model_type = "man"

    $(".hotspot-change-model__img").on("click", function(){
        model_type = $(this).attr("attr-type")
 

        $(".hotspot-change-model__img.hide").removeClass("hide")
        $(".hotspot-change-model__img[attr-type='"+model_type+"']").addClass("hide")
        
        $(".hotspots-snow__img.hide").removeClass("hide")
        $(".hotspots-snow__img[attr-type='"+model_type+"']").addClass("hide")
        model_type == "man" ? model_type = "woman" : model_type = "man"
        console.log("change sex desk", model_type)

    })

    $(".hotspot-change-model-mob__off").on("click", function(){
        model_type = $(this).attr("attr-type")
        console.log("change sex", model_type)

        if ( model_type == "man" ) {
            $(".img-man-on").removeClass("hide")
            $(".img-man-off").addClass("hide")
            $(".img-woman-on").addClass("hide")
            $(".img-woman-off").removeClass("hide")

            $(".hotspots-snow__img.hide").removeClass("hide")
            $(".hotspots-snow__img[attr-type='woman']").addClass("hide")

        } else {
            $(".img-woman-on").removeClass("hide")
            $(".img-woman-off").addClass("hide")
            $(".img-man-on").addClass("hide")
            $(".img-man-off").removeClass("hide")

            $(".hotspots-snow__img.hide").removeClass("hide")
            $(".hotspots-snow__img[attr-type='man']").addClass("hide")
        }
    })

    $(window).resize(function() {
        $(".modal-hotspot").addClass("hide")
        $(".hotspot-modal").addClass("hide")
    });

    $(".modal-hotspot__close").on("click", function(){
        $(".modal-hotspot").addClass("hide")
        $(".hotspot-modal").addClass("hide")
    })
    $(".modal-hotspot").on('click', function(e) {

        if (!$(".modal-hotspot").hasClass("hide")) {

            var modal_hotspot = $(".hotspot-modal");
            if (!$(e.target).closest(modal_hotspot).length) {
                $(".modal-hotspot").addClass("hide")
                $(".hotspot-modal").addClass("hide")
            }
        } 
    });

    $(".hotspot-pin").on("click", function(){
        
        if ($(window).width() > 1024) {
            var hotspot_num = $(this).attr("attr-hotspot")
            console.log( hotspot_num , model_type )
            $(".modal-hotspot").removeClass("hide")
            $(".hotspot-modal[attr-hotspot='" + hotspot_num + "-" + model_type +"']").removeClass("hide")
        } else {
            var hotspot_num = $(this).attr("attr-hotspot").replace('hotspot-','');
            var hotspot_num_int = parseInt(hotspot_num) - 1
            $(".modal-hotspot").removeClass("hide")
            $(".hotspot-modal[attr-hotspot='mob']").removeClass("hide")
            $(".hotspot-modal-slider").addClass("hide")
            $(".hotspot-modal-slider-" + model_type).removeClass("hide")
            var hotspot_modal_mob = new Swiper(".hotspot-modal-slider-" + model_type, {
                slidesPerView: 1,
                spaceBetween: 10,
                pagination: {
                    el: ".hotspot-modal--mob .swiper-pagination",
                },
            })
            hotspot_modal_mob.slideTo(hotspot_num_int, 500);
        }


    })

    var best_sellers_slider = new Swiper(".technology-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".technology-slider .swiper-button-next",
            prevEl: ".technology-slider .swiper-button-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 640px
            991: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
    });
    var best_sellers_slider_xwarm = new Swiper(".technology-slider--xwarm", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".technology-slider--xwarm .swiper-button-next",
            prevEl: ".technology-slider--xwarm .swiper-button-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 640px
            991: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
    });

    var swiper_left = new Swiper('#section-blog-snow .swiper-container.container-left', {
        touchRatio: 0.1,
        fadeEffect: {
            crossFade: true
        },
        onSlideChangeStart: function (e, swiper) {
            console.log(swiper.touches.diff); //should be not empty in this case
        }
    });
    var swiper_right = new Swiper('#section-blog-snow .swiper-container.container-right', {
        navigation: {
            nextEl: '#section-blog-snow .swiper-button-next',
            prevEl: '#section-blog-snow .swiper-button-prev',
        },
        pagination: {
            el: '#section-blog-snow .swiper-pagination',
            clickable: true
        },
    });


    if (typeof swiper_left !== null) {
        swiper_left.controller.control = swiper_right;
    }
    if (typeof swiper_right !== null) {
        swiper_right.controller.control = swiper_left;
    }


}




// 
// 
// TRACKING
// 
// 



// Page Contattaci

$( document ).ready(function() {
    if ($(".contact-form").length) {

        let urlParams = new URLSearchParams(window.location.search)
        if( urlParams.has('contact_posted') ) {
        let param_contact = urlParams.get('contact_posted')
        
        console.log(param_contact)
            if ( param_contact == "true") {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                'event': 'submit-form-contattaci-ok'
                });
            } 
        }


    }
})



// Registrazione

$('#create_customer').submit(function(event) {
    event.preventDefault();
    var data = $(this).serialize();
  
   //create new account
    $.post('/account', data)
      .done(function(data){
        console.log('success');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'submit-form-registrazione-ok'
        });
      }).fail(function(){console.log('error def');});
     return false;
}); 



// Login

$( document ).ready(function() {
    if ($("#customer_login").length) {

        $("button.button-login").on("click", function() {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
               'event': 'submit-form-login-ok'
            });
        })

    }
})



// Promo

// Alla visualizzazione del banner / della slide dello slideshow, caricare il seguente script:

// window.dataLayer = window.dataLayer || [];
// window.dataLayer.push({
//   'ecommerce': {
//     'promoView': {
//       'promotions': [   // array of promoFieldObjects
//        {
//          'id': 'ID_PROMO',
//          'name': 'NOME_PROMO',
//          'creative': 'CREATIVITA'',
//          'position': 'POSIZIONE'
//        },
//        {
//          'id': 'ID_PROMO',
//          'name': 'NOME_PROMO',
//          'creative': 'CREATIVITA'',
//          'position': 'POSIZIONE'
//        }]
//     }
//   }
// });


// Al clic su un banner / slide dello slideshow, caricare il seguente script:

// window.dataLayer = window.dataLayer || [];
// window.dataLayer.push({
//     'event': 'promotionClick',
//     'ecommerce': {
//       'promoClick': {
//         'promotions': [
//          {
//            'id': 'ID_PROMO',
//            'name': 'NOME_PROMO',
//            'creative': 'CREATIVITA',
//            'position': 'POSIZIONE'
//          }]
//       }
//     }
//   });
// }



$( document ).ready(function() {

        // Click su pulsante hop now di un prodotto
        // Best seller
        // $(".best-sellers-cta__link").on("click", function() {

        //     var title_prod = $(this).attr("attr-title")
        //     var price_prod = $(this).attr("attr-price")
        //     var handle_prod = $(this).attr("attr-handle")
        //     var type_prod = $(this).attr("attr-type")

        //     window.dataLayer = window.dataLayer || [];
        //     window.dataLayer.push({
        //     'event': 'productClick',
        //     'ecommerce': {
        //         'click': {
        //         'currencyCode': 'EUR',
        //         'actionField': {'list': 'Best Seller'},
        //         'products': [{
        //             'name': title_prod,
        //             'id': handle_prod,
        //             'price': price_prod,
        //             'brand': 'Silverskin.it',
        //             'category': type_prod,
        //             'variant': '',
        //             'position': ''
        //         }]
        //         }
        //     }
        //     });
        // })

        // Product listed in collection
        // $(".grid-product__link").on("click", function() {

        //     var title_prod = $(this).attr("attr-title")
        //     var price_prod = $(this).attr("attr-price")
        //     var handle_prod = $(this).attr("attr-handle")
        //     var type_prod = $(this).attr("attr-type")

        //     window.dataLayer = window.dataLayer || [];
        //     window.dataLayer.push({
        //     'event': 'productClick',
        //     'ecommerce': {
        //         'click': {
        //         'currencyCode': 'EUR',
        //         'actionField': {'list': 'Best Seller'},
        //         'products': [{
        //             'name': title_prod,
        //             'id': handle_prod,
        //             'price': price_prod,
        //             'brand': 'Silverskin.it',
        //             'category': type_prod,
        //             'variant': '',
        //             'position': ''
        //         }]
        //         }
        //     }
        //     });
        // })

        // Aggiunta prodotto al carrello
        // $(".add-to-cart").on("click", function() {

        //     var title_prod = $(this).attr("attr-title")
        //     var price_prod = $(this).attr("attr-price")
        //     var handle_prod = $(this).attr("attr-handle")
        //     var type_prod = $(this).attr("attr-type")
        //     var variant_prod = $(".variant__button-label.variant-selected").text()

        //     console.log(variant_prod)
        //     window.dataLayer = window.dataLayer || [];
        //     window.dataLayer.push({
        //       'event': 'addToCart',
        //       'ecommerce': {
        //         'currencyCode': 'EUR',
        //         'add': {
        //           'products': [{
        //             'name': title_prod,
        //             'id': handle_prod,
        //             'price': price_prod,
        //             'brand': 'Silverskin.it',
        //             'category': type_prod,
        //             'variant': variant_prod,
        //             'quantity': ''
        //            }]
        //         }
        //       }
        //     });
        // })


        // Rimozione prodotto dal carrello ajax
        // $(document).on("click", ".js-qty__adjust--minus", function() {

        //     var title_prod = $(this).closest(".ajaxcart__product").find(".ajaxcart__product-name").text()
        //     var handle_prod = $(this).closest(".ajaxcart__product").find(".ajaxcart__product-name").attr("href").replace('/products/','').split('?variant', 1)[0]
        //     var variant_prod = $(this).closest(".ajaxcart__product").find(".ajaxcart__product-meta").text()
        //     var price_prod = $(this).closest(".ajaxcart__product").find(".ajaxcart__price").text().replace('€ ','').replace(',','.').replace(/\s/g, '')

        //     window.dataLayer = window.dataLayer || [];
        //     window.dataLayer.push({
        //     'event': 'removeFromCart',
        //     'ecommerce': {
        //         'currencyCode': 'EUR',
        //         'remove': {
        //         'products': [{
        //             'name': title_prod,
        //             'id': handle_prod,
        //             'price': price_prod,
        //             'brand': 'Silverskin.it',
        //             'category': '',
        //             'variant': variant_prod,
        //             'quantity': ''
        //         }]
        //         }
        //     }
        //     });
        // })

        // Rimozione prodotto dal carrello non ajax (pagina cart)
        // $(".cart-remove-button").on("click", function() {

        //     var title_prod = $(this).attr("attr-title")
        //     var price_prod = $(this).attr("attr-price")
        //     var handle_prod = $(this).attr("attr-handle")
        //     var type_prod = $(this).attr("attr-type")

        //     window.dataLayer = window.dataLayer || [];
        //     window.dataLayer.push({
        //     'event': 'removeFromCart',
        //     'ecommerce': {
        //         'currencyCode': 'EUR',
        //         'remove': {
        //         'products': [{
        //             'name': title_prod,
        //             'id': handle_prod,
        //             'price': price_prod,
        //             'brand': 'Silverskin.it',
        //             'category': type_prod,
        //             'variant': variant_prod,
        //             'quantity': ''
        //         }]
        //         }
        //     }
        //     });
        // })

        
        
        // Store Locator search
        $(document).on("click", "button#search_submit", function(event) {

            event.preventDefault();

            var query_map = $(document).find(".address-search-box").val()
            var within_distance = $(document).find("#within_distance").val()

            console.log(query_map)
            console.log(within_distance)
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                    'event': 'storelocator',
                    'queryGeo': query_map,
                    'raggioKm': within_distance
            });
        })
        
        // All'invio form "avvisami quando disponibile", caricare il seguente script:
        $(document).on("click", "button#SI_trigger", function() {

            var taglia_trigger = $(".variant__button-label.disabled.variant-selected").text()
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                    'event': 'submit-form-avvisami',
                    'formTaglia': taglia_trigger
            });
        })


        // Al completamento andato a buon fine del form per l'iscrizione alla newsletter (sia dal footer che dai pop-up), caricare il seguente script:
        $(document).on("click", "#mc-embedded-subscribe-form input", function() {
            console.log("iscrizione ok")
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
            'event': 'submit-form-newsletter-ok'
            });
        })
        $(document).on("click", "#mc-embedded-subscribe-form2 input", function() {
            console.log("iscrizione ok")
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
            'event': 'submit-form-newsletter-ok'
            });
        })
        

        // Promo -- Alla visualizzazione del banner / della slide dello slideshow, caricare il seguente script:

        // $(document).on("click", ".grid-product__link", function() {

        //     if ( $(this).find(".promo-active").length ) {

        //         var id_promo = "calze-fresh"
        //         var name_promo = "Calze Fresh"
        //         var creative_promo = "Calze Fresh"
        //         var position_promo = "Calze Fresh"
            
    
        //         window.dataLayer = window.dataLayer || [];
        //         window.dataLayer.push({
        //         'event': 'promotionClick',
        //         'ecommerce': {
        //             'promoClick': {
        //                 'promotions': [   // array of promoFieldObjects
        //                     {
        //                         'id': id_promo,
        //                         'name': name_promo,
        //                         'creative': creative_promo,
        //                         'position': position_promo
        //                     }
        //                 ]
        //             }
        //         }
        //         });

        //     }
        // })



})
