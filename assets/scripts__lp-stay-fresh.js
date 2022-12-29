if ($('.template-lp-stay-fresh').length) {

    /* js 4 section intro */
    const swiperIntro = new Swiper(".swiper-intro", {
        slidesPerView: 1,
        centeredSlides: true,
        /* autoHeight: true, */
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.intro-button-next',
            prevEl: '.intro-button-prev',
        }
    })

    swiperIntro.on('slideChange', function (e) {
        if (swiperIntro.isEnd && swiperIntro.activeIndex == swiperIntro.slides.length - 1) {
            const lastIntroSlideArrow = document.querySelector(".swiper-intro .intro-button-next.swiper-button-disabled")
            swiperIntro.autoplay = false;
            lastIntroSlideArrow.addEventListener("click", (e) => {
                document.cookie = "stayIntroClose=true";
                skipIntro()
                swiperIntro.autoplay = false;
            })
        }
    });


    if (document.cookie.match(/^(.*;)?\s*stayIntroClose\s*=\s*[^;]+(.*)?$/)) {
        skipIntro()
    } else {
        const jsCloseIntro = document.querySelector(".js-close-intro")
        jsCloseIntro.addEventListener("click", () => {
            document.cookie = "stayIntroClose=true";
            skipIntro()
        })
    }

    function skipIntro() {
        const intro = document.querySelector(".intro")
        const fullLP = document.querySelector(".js-inner-lp")
        const anchorBanner = document.querySelector(".stay-fresh-anchor")

        intro.style.opacity = 0
        intro.style.visibility = "hidden"
        //intro.style.display = "none"

        fullLP.style.opacity = 1
        fullLP.style.visibility = "visible"
        //fullLP.style.display = "block"
        anchorBanner.style.opacity = 1
        goToSection("hero")
        isLPVisible()
    }


    function isLPVisible() {
        /* js 4 section when */
        /* DESKTOP */

        ScrollTrigger.matchMedia({
            "(min-width: 1260px)": function () {
                const whenAssets = document.querySelectorAll('.assets-content img')

                whenAssets.forEach((el, i) => {
                    ScrollTrigger.saveStyles(el);
                    gsap.from(el, 2, {
                        scrollTrigger: {
                            trigger: el,
                            //markers: true,
                            start: "top bottom",
                            end: "bottom center",
                            scrub: true
                        },
                        y: -100
                    });
                })
                const whenTextAssets = document.querySelectorAll('.text-assets')

                whenTextAssets.forEach((el, i) => {
                    ScrollTrigger.saveStyles(el);
                    gsap.from(el, 2, {
                        scrollTrigger: {
                            trigger: el,
                            //markers: true,
                            start: "top bottom",
                            end: "bottom center",
                            scrub: true
                        },
                        y: 100
                    });
                })
                console.log("esegui parallax");
            }
        })

        /* js 4 section myths */
        const swiperMyths = new Swiper(".swiper-myths", {
            slidesPerView: 1,
            centeredSlides: true,
            allowTouchMove: true,
            /*  autoHeight: true, */
            navigation: {
                nextEl: '.myths-button-next',
                prevEl: '.myths-button-prev',
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
            },
        }).on('slideChangeTransitionEnd', function (e) {
            const currentSlideNumber = document.querySelector(".current-slide-number")
            currentSlideNumber.innerHTML = (swiperMyths.realIndex + 1) + '/' + (swiperMyths.slides.length - 2)
        })
        const currentSlideNumber = document.querySelector(".current-slide-number")
        currentSlideNumber.innerHTML = (swiperMyths.realIndex + 1) + '/' + (swiperMyths.slides.length - 2)
        /* js 4 section layer */

        const thumbLayer = new Swiper(".thumbs-layer", {
            slidesPerView: 1,
            watchSlidesProgress: true,
            autoHeight: true,
            allowTouchMove: false,
            observer: true,
            observerParents: true,
            loop: true,
        })

        const swiperLayer = new Swiper(".swiper-layer", {
            slidesPerView: 1.1,
            spaceBetween: 20,
            centeredSlides: false,
            loop: true,
            autoHeight: false,
            allowTouchMove: true,
            thumbs: {
                swiper: thumbLayer
            },
            navigation: {
                nextEl: '.thumb-button-next',
                prevEl: '.thumb-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
            },
            breakpoints: {
                640: {
                    slidesPerView: 1
                }
            },
            effect: 'coverflow',
            coverflowEffect: {
                scale: 0.9,
                rotate: 0,
                slideShadows: false
            }
        })
            .on('slideChangeTransitionEnd', function (e) {
                changeNextProductImg()
            })

        changeNextProductImg()

        function changeNextProductImg() {
            const nextProductSliderLayer = document.querySelector(".swiper-layer .swiper-slide-next img").getAttribute("src")
            const nextProductImg = document.querySelector(".next-product img")
            nextProductImg.src = nextProductSliderLayer
            //console.log("nextProductLayer", nextProductSliderLayer);
        }
        /* js 4 section story */
        const swiperStory = new Swiper(".swiper-story", {
            slidesPerView: 1,
            centeredSlides: true,
            /* autoHeight: true, */
            loop: true,
            navigation: {
                nextEl: '.story-button-next',
                prevEl: '.story-button-prev',
            }
        })

        /* js 4 anchor */

        const anchorSection = [...document.querySelectorAll(".js-section-anchor")]
        const anchorLink = [...document.querySelectorAll(".stay-fresh-anchor .js-anchor-link")]
        const scrollDown = document.querySelector(".js-scroll-down")

        scrollDown.addEventListener('click', function () {
            const attrLink = scrollDown.getAttribute('data-attr')
            goToSection(attrLink)
        });


        anchorSection.forEach((element, index) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                    //markers: true,
                    toggleClass: { targets: anchorLink[index], className: "is-active" },
                    onEnter: changeSelected,
                    onEnterBack: changeSelected
                }
            })
        });
        //const anchorLinkSelect = document.querySelector("#stay-fresh-anchor")


        function currentAnchor() {
            if (window.innerWidth > 768) {
                anchorLink.forEach(element => {
                    element.addEventListener('click', function () {
                        const attrLink = element.getAttribute('data-attr')
                        goToSection(attrLink)
                    });
                });
            } else {
                const selectElement = document.querySelector('#stay-fresh-anchor');
                selectElement.addEventListener('change', function () {
                    const output = selectElement.value;
                    goToSection(output)
                });
            }
        }
        currentAnchor()



        function changeSelected() {
            /* const activeAnchor = document.querySelector(".stay-fresh-anchor .is-active").getAttribute('data-attr')
            document.getElementById('stay-fresh-anchor').value = activeAnchor; */
        }


        $(window).resize(function () {
            currentAnchor()
        });
    }

    window.addEventListener('load', function () {
        console.log('All assets are loaded')
    })
}

function goToSection(params) {
    if (window.innerWidth > 679) {

        var gap = 80;
    } else {
        var gap = 120;
    }

    console.log("params",params);
    window.scrollTo({
        top: $("#" + params).offset().top - gap,
        behavior: "smooth"
    });
    /* $('html, body').animate({
        scrollTop: $("#" + params).offset().top - gap
    }, 750); */

}