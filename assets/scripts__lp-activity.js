

//selectors
let $activityTemplate = $(".activity-page__template")
let $snowTemplate = $("#shopify-section-page-snow-template")
let $activityHero = $(".activity-page__hero")
let $paneSelector = $(".js-pane-select")
let $paneShow = $(".js-pane")
let $tempSelector = $(".js-select-collection")
let $backbutton = $(".back-selection") 
let $sectionBestsellerSnow = $("#section-bestseller-snow")
let $floatingBar = $(".floating-bar")
let $floatingBarActivity = $(".flotaing-bar__activity")
let $floatingBarCollection = $(".flotaing-bar__collection span")
let $collectionContainer = $(".collection-container")
let $activityPaneSelector= $(".activity-page__pane-selector")
let switchLang = $(".ly-switcher-wrapper")
//memory
var selectedActivity="running"
var selectedTemp = "fresh"
let swiperProducts = null
if ( $snowTemplate.length ) {
    var selectedActivity="snowsport"
    var selectedTemp = "warm"
}

//init and listeners
if ($activityTemplate.length || $snowTemplate.length) {
    $(function () {

        $paneSelector.on("click", function () {
            let activity = $(this).attr("data-pane")
            
            activePane(activity)
            updateBar()
        })

        $tempSelector.on("click", function () {
            if($(this).hasClass("active")){
                deactiveCollection()
            }else{

                
                activeCollection(this)
            }
            updateBar()
        })

        $backbutton.click(function () {

            if ( $snowTemplate.length ) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $sectionBestsellerSnow.offset().top - 100
                }, 500);
            } else {
                $([document.documentElement, document.body]).animate({
                    scrollTop: 80
                }, 500);
            }

        });

        activeCollection($(".activity-page__pane-selector.fresh"),false)
        if ( $snowTemplate.length) {
            activeCollection($(".activity-page__pane-selector.warm"),false)
        }
        switchLang.remove()
       
    })
}

function enableBar(){   
    $floatingBar.addClass("active")
    // let options = {
   
    //     threshold: 1.0
    // }

    // let observer = new IntersectionObserver(function (entries){
    //     entries.forEach((entry) => {
    //         console.log(entry)
    //         if (entry.isIntersecting) {

    //             $floatingBar.removeClass("active")
    //         }else{
    //             $floatingBar.addClass("active")
    //         }
    //     });
     
    // }, options);
    // let target = document.querySelector('.activity-page__tabs');
    // observer.observe(target);
}

function activePane(activity){
    selectedActivity = activity
    $paneSelector.removeClass("active")
    $paneShow.removeClass("active")
    $(".js-pane-select[data-pane=" + selectedActivity + "]").addClass("active")
    $(".js-pane[data-pane=" + selectedActivity + "]").addClass("active")
    $activityHero.attr("data-hero", selectedActivity)
    resetCollection()
    
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".activity-page__tabs").offset().top - ((window.innerWidth <= 1024) ? 100: 122)
        // scrollTop: 80
    }, 500);

    let itemToActivate = selectedActivity == "mountaineering" ? $(".activity-page__pane-selector-wrapper.active .js-select-collection[data-temp=warm]") : $(".activity-page__pane-selector-wrapper.active .js-select-collection:first-child")

    activeCollection(itemToActivate,false)
    
}

function activeCollection(collectionSelectedEle, scroll=true){
   
    selectedTemp = $(collectionSelectedEle).attr("data-temp")
    enableBar()

    console.log(selectedActivity + "-stay-" + selectedTemp)
    
    $tempSelector.removeClass("active")
    $collectionContainer.removeClass("active")

    $(".collection-container[data-collection=" + selectedActivity + "-stay-" + selectedTemp  +"]").addClass("active")
    $(".activity-page__pane-selector." + selectedTemp).addClass("active")

    initSlider()

  
    if(scroll){
        if(window.innerWidth>1024){

            $([document.documentElement, document.body]).animate({
                scrollTop: $(".activity-page__products").offset().top -130
            }, 500);
        }
        else{
            $([document.documentElement, document.body]).animate({
                scrollTop: $(collectionSelectedEle).offset().top - 100
            }, 500);
            
        }
    }
}

function deactiveCollection(){
    $tempSelector.removeClass("active")
    $collectionContainer.removeClass("active")
}

function resetCollection(){
   
    $activityPaneSelector.removeClass("active")
    $collectionContainer.removeClass("active")
   
  
}

function initSlider(){
    // console.log("call initSlider")
    // if (swiperProducts){
    //     swiperProducts.destroy()
    // }
    swiperProducts = new Swiper(".collection-container.active .swiper-activity", {
        slidesPerView: 1.1,
        centeredSlides: false,    
        loop: false,
        spaceBetween:40,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },  
        breakpoints:{
            1024:{
                slidesPerView: 3.5,
            }
        }  
    })

}


function updateBar(){
    $floatingBarActivity.text(selectedActivity)
    $floatingBarCollection.text(selectedTemp)
}


window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});