(function(document) {

    var selectors = {
        showVideoBtn: '.show-video-bnt',
        modalVideo: '.modal-video',
        modalVideoVideo_mob: '.modal-video video.only-mob',
        modalVideoVideo_desk: '.modal-video video.only-desk',
        modalVideoClose: '.modal-video__close',
        textBannerSnow: "#section-textbanner-snow",
        heroSnowIconDown: ".hero-snow-icon",
        sectionBestsellers: "#section-bestseller-snow",
        goToCollections: ".go-to-collections"
    };

  
    var showVideoBtn = document.querySelector(selectors.showVideoBtn);
    var modalVideo = document.querySelector(selectors.modalVideo);
    var modalVideoVideo_mob = document.querySelector(selectors.modalVideoVideo_mob);
    var modalVideoVideo_desk = document.querySelector(selectors.modalVideoVideo_desk);
    var modalVideoClose = document.querySelector(selectors.modalVideoClose);
    var textBannerSnow = document.querySelector(selectors.textBannerSnow);
    var heroSnowIconDown = document.querySelector(selectors.heroSnowIconDown);
    // var sectionBestsellers = document.querySelector(selectors.sectionBestsellers);
    var goToCollections = document.querySelector(selectors.goToCollections);


    showVideoBtn.addEventListener("click", function(){
        modalVideo.classList.add("show")

        if (window.screen.width > 768) {
            modalVideoVideo_desk.play()
        } else {
            modalVideoVideo_mob.play()
        }
    })

    modalVideoClose.addEventListener("click", function(){
        modalVideoVideo_desk.pause()
        modalVideoVideo_mob.pause()
        modalVideo.classList.remove("show")
    })

    heroSnowIconDown.addEventListener("click", function(){
        textBannerSnow.scrollIntoView({ behavior: 'smooth', block: 'start'});
    })

    goToCollections.addEventListener("click", function(){
        textBannerSnow.scrollIntoView({ behavior: 'smooth', block: 'start'});
    })


})(document);
  