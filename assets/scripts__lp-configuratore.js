let cicleImgFirstPageInterval
let curPage=1
let configurator={}
let offsetCollection= 0
let offsetTemperature = 0
//selectors
let $configPage = $(".config__page")
let $configContainer = $(".config__container")
let $configBottomNav = $(".config__bottom-nav")
let $configBottomBtn = $(".config__bottom-nav--btn")
let $configBottomBtnBack = $(".config__back")
let $configBottomProgress = $(".config__bottom-nav--progress")
let $configGoTo = $('.go-to')
let $configSaveEle = $(".configurator-js")
let $configTemplate = $('.template-configuratore')
let $configPage1 = $(".config__page--1")
let $pageIndicator = $(".page-js")
let $addOtherActivityBtn = $(".activity-add-btn-js")
let $activityItem = $(".activity__item")
let sliderTemperature = document.getElementById('sliderTemperature');
let sliderSensitivity = document.getElementById('sliderSensitivity');
let sliderIntensity = document.getElementById('sliderIntensity');
let sliderLayer = document.getElementById('sliderLayer');
let sliderIntensityDesk = document.getElementById('sliderIntensityDesk');
let sliderLayerDesk = document.getElementById('sliderLayerDesk');
let isMob = window.innerHeight<768
let urlCollection

//functions
function initConfig(){
    // console.log("init config")
    goToPage(1)
    cicleImgFirstPage()
}

function cicleImgFirstPage(){
    if (!isMob){
        return
    }
    // console.log("cicleImgFirstPage")
    cicleImgFirstPageInterval = setInterval(() => {
        if (curPage!=1){
            clearInterval(cicleImgFirstPageInterval)
        }
        $configPage1.toggleClass("alt")


    }, 3000);
}

function goToPage(page) {
    page = parseInt(page)
    // console.log("goto",page)
    curPage = page

    // $configPage.css("display","none");
    $(".config__page").removeClass("active");    
    $(".config__page[data-page=" + page + "]").addClass("active");    
    $configContainer.attr("data-page",page)

    incrementProgressBar( page-1 )
    $pageIndicator.text(page-1)
    $configBottomBtnBack.hide()

    showPosition()
    if (page ==1){
        $configBottomNav.addClass("disabled")
    }
    if (page > 1 && page <= 5 ){
        $configBottomNav.removeClass("disabled")
        incrementBtn( (page+1) )
        incrementBtnBack((page - 1) )
    }

    if (canEnableNextButton()) {

        enableNextButton()
    }

    if (page == 4 || page == 5){
        enableNextButton()
        updateSliders()
    }
    if (!isMob && page == 5){
        goToPage(6)
    }

    if (page == 6){
        $configBottomNav.addClass("disabled")
        showCollection()   
        $(".discover-collection-url-js").attr("href", urlCollection)     
    }

   
}

function showPosition(){
    $(".config__position").hide();
    if(!isMob){
        $(".config__position--item").removeClass("active")
        if (curPage == 2 ){
            $(".config__position").show();
            $(".config__position--1").addClass("active")
        }
        if( curPage == 3 ){
            $(".config__position").show();
            $(".config__position--2").addClass("active")
        }
        if( curPage == 4) {
            $(".config__position").show();
            $(".config__position--3").addClass("active")
        }
    }
}

function incrementProgressBar(page){
    $configBottomProgress.attr("data-page", page)
}

function incrementBtn(page) {
    $configBottomBtn.attr("data-page", page)
    $configBottomBtn.addClass("disabled")
}

function incrementBtnBack(page) {
    $configBottomBtnBack.attr("data-page", page)
    $configBottomBtnBack.show()
}



function saveConfig(property,value){
    configurator[property] = value
    if (canEnableNextButton()){

        enableNextButton()
    }
    highlightGenderSelected()
}

function highlightGenderSelected(){
    $(".gender-selector__container").removeClass("active")
    $(".gender-selector__container[data-value='" + configurator.gender+"']").addClass("active")
}

function canEnableNextButton(){

    if (curPage == 2){
        if(configurator.gender){
          
            return true
        }
    }
    if (curPage == 3) {
        if (configurator.activities && configurator.activities.length>0) {

            return true
        }
    }
    if (curPage == 4) {
        if (configurator.temperature) {
            return true
        }
    }

 

    return false

}

function enableNextButton() {
    console.log("enableNextButton")
    $configBottomBtn.removeClass("disabled")

}

function disableNextButton() {
    console.log("disableNextButton")
    $configBottomBtn.addClass("disabled")

}


function toggleActivity(activity){

    if(!configurator["activities"]){
        configurator["activities"] = []
    }

    const index = configurator["activities"].indexOf(activity);
    if (index > -1) {
        configurator["activities"].splice(index, 1); // 2nd parameter means remove one item only
        $('.activity__item[data-value="' + activity + '"]').removeClass("active")
    }else{

        $('.activity__item[data-value="' + activity+'"]').addClass("active")
        configurator["activities"].push(activity)
    }

    if (canEnableNextButton()) {
        enableNextButton()
    }else{

        disableNextButton()
    }

   
}


function highlightCollections() {

    collection = calculateCollection()

    $(".collection").removeClass("active")
    if (collection <= -2) {
        $(".collection.x-warm").addClass("active")
    }

    if (collection >= 2) {
        $(".collection.fresh").addClass("active")
    }

    if (collection > -2 && collection <= -1) {
        $(".collection.x-warm").addClass("active")
        $(".collection.warm").addClass("active")
    }

    if (collection >= 1 && collection < 2  ){
        $(".collection.warm").addClass("active")
        $(".collection.fresh").addClass("active")
        
    }

    if (collection > -1 && collection < 1) {
        $(".collection.warm").addClass("active")
    }

}


function showCollection(){

    collection = calculateCollection()

    $(".selected_collection").removeClass("active")

    if (collection <= -2){
        $(".selected_collection.x-warm").addClass("active")
    }

 
    if (collection > -2 && collection <= -1) {
        $(".selected_collection.x-warm-warm").addClass("active")
    }
    
    if (collection > -1 && collection < 1){
        $(".selected_collection.warm").addClass("active")
    }

    if (collection >= 1 && collection < 2) {
        $(".selected_collection.warm-fresh").addClass("active")
    }

    if (collection >= 2) {
        $(".selected_collection.fresh").addClass("active")
    }


}

function calculateCollection(){
     offsetTemperature = 0
    let finalCollection = 0
    if (configurator.temperature < -25) {
        offsetTemperature = -3
    }
    if (configurator.temperature >= -25 && configurator.temperature < -20) {
        offsetTemperature = -2
    }
    if (configurator.temperature >= -20 && configurator.temperature <= -10  ) {
        offsetTemperature = -2
    }
    if (configurator.temperature > -10 && configurator.temperature < 0) {
        offsetTemperature = -0.5
    }
    if (configurator.temperature == 0) {
        offsetTemperature = 0
    }
    if (configurator.temperature > 0 && configurator.temperature <= -5) {
        offsetTemperature = -0.5
    }
    if (configurator.temperature > 5 && configurator.temperature < 15) {
        offsetTemperature = 1
    }
    if (configurator.temperature >= 15 && configurator.temperature < 25) {
        offsetTemperature = 2
    }
    if (configurator.temperature >= 25) {
        offsetTemperature = 3
    }

    finalCollection = offsetTemperature + offsetCollection

    return finalCollection
}

function calculateOffsetCollection() {

    offsetCollection = 0
    let offsetIntesity = configurator.temperature > 15 ? 0 : configurator.intensity  


    if (configurator.temperature >= 10 && configurator.intensity<0){
        offsetIntesity = configurator.intensity/2
    }

    if (configurator.temperature < -20 && configurator.intensity > 0) {
        offsetIntesity = configurator.intensity / 2
    }


    let offsetLayer = configurator.temperature > 15 ? 0: configurator.layer  

    if (configurator.temperature < -20){
        offsetLayer = 0
    }

    let offsetSensitivity = ((configurator.sensitivity * -1)/2)

    if (configurator.temperature > 10) {
        offsetSensitivity = 0
    }

    if (configurator.temperature <= -10) {
        offsetSensitivity = 0
    }

    if (configurator.temperature == -5 && configurator.sensitivity > 0) {
       
        offsetSensitivity = -2
    }

    if (configurator.temperature == 5 && configurator.sensitivity < 0) {

        offsetSensitivity = 1
    }
    if (configurator.temperature == 10 && configurator.sensitivity < 0) {

        offsetSensitivity = 1
    }
    if (configurator.temperature == 10 && configurator.sensitivity > 0) {

        offsetSensitivity = -1
    }


    offsetCollection = offsetIntesity+ offsetLayer+ offsetSensitivity

    console.log("c", offsetCollection, "i", offsetIntesity, "l", offsetLayer, "s", offsetSensitivity)
 

}



function addOtherActivity(activity){
    // console.log("addOtherActivity",activity)
    if (!configurator["otherActivities"]) {
        configurator["otherActivities"] = []
    }

    $(".others-activities").append(
        '<div class="other-activity other-activity-' + activity + '"><input type="text" value="' + activity + '" readonly />        <div class="other-activity-btn other-activity-delete" data-value="' + activity +'" > <img class="active close-icon" src="https://cdn.shopify.com/s/files/1/0285/3706/1424/files/silverskin-configurator-remove-icon-1x.png?v=1646663426" alt=""> </div> </div >'
    )
    configurator["otherActivities"].push(activity)
    
}

function deleteOtherActivity(activity) {
    // console.log("deleteOtherActivity", activity)
    const index = configurator["otherActivities"].indexOf(activity);
    if (index > -1) {
        configurator["otherActivities"].splice(index, 1); // 2nd parameter means remove one item only
        $('.other-activity-' + activity).remove();
    } 

}

function setTemperature(temp){
    configurator.temperature = temp
    // console.log(configurator)
    calculateOffsetCollection()
}

function setIntensity(intensity) {
    configurator.intensity = intensity
    // console.log(configurator)
    calculateOffsetCollection()
}

function setSensitivity(sensitivity) {
    configurator.sensitivity = sensitivity
    // console.log(configurator)
    calculateOffsetCollection()
}

function setLayer(layer) {
    configurator.layer = layer
    // console.log(configurator)
    calculateOffsetCollection()
}


function initSliders(){

    //slider temperetures
    noUiSlider.create(sliderTemperature, {
        start: 0,
        step: 5,
      
        range: {
            'min': -40,
            'max': 40
        },
        pips: {
            mode: 'steps',
            density: 10,
            filter: (value, type) => {
                return value % 10 ? 0 : 1;
            },

        }
    });
    setTemperature(0)

    $('#sliderTemperature .noUi-value').addClass("highlight")
    sliderTemperature.noUiSlider.on('update', function (value) {
        
        // highlightsPips($('#sliderTemperature .noUi-value:visible'), values)
        setTemperature(parseInt(value))
        updateSliders()
       
        
    });

    //slider intensity
    noUiSlider.create(sliderIntensity, {
        start: 0,
        step: 1,
        // padding:1,
        range: {
            'min': -2,
            'max': 2
        },
    });
    sliderIntensity.noUiSlider.on('update', function (value) {
        setIntensity(parseInt(value))
        updateSliders()
    });

    //slider intensity
    noUiSlider.create(sliderIntensityDesk, {
        start: 0,
        step: 1,
        // padding:1,
        range: {
            'min': -2,
            'max': 2
        },
    });
    sliderIntensityDesk.noUiSlider.on('update', function (value) {
        setIntensity(parseInt(value))
        updateSliders()
    });
    setIntensity(0)


    //slider sensitivity
    noUiSlider.create(sliderSensitivity, {
        start: 1,
        step: 2,
        // padding:1,
        range: {
            'min': -1,
            'max': 1
        },
    });
    sliderSensitivity.noUiSlider.on('update', function (value) {
        setSensitivity(parseInt(value))
        updateSliders()
    });
    setSensitivity(0)
    

    //slider layer
    
    noUiSlider.create(sliderLayer, {
        start: 0,
        step: 1,
        // padding:1,
        range: {
            'min': -2,
            'max': 2
        },
    });
    sliderLayer.noUiSlider.on('update', function (value) {
        setLayer(parseInt(value))
        updateSliders()
    });

    noUiSlider.create(sliderLayerDesk, {
        start: 0,
        step: 1,
        // padding:1,
        range: {
            'min': -2,
            'max': 2
        },
    });
    sliderLayerDesk.noUiSlider.on('update', function (value) {
        setLayer(parseInt(value))
        updateSliders()
    });
    setLayer(0)


    generateCollectionUrl()

}

function updateSliders(){
    if (curPage>2){

        highlightCollections()
    }
    generateCollectionUrl()
}


function removeUndesiderizedThings(){

    setTimeout(() => {
        $("#CookiebotWidget").hide()
    }, 1000); 
    $(".ly-switcher-wrapper").hide()

}

function removeDeskMobDuplicateEle(){

    if(isMob){

        $(".activity__item-wrapper .main.only-desk").remove()
        $(".tic.only-desk").remove()
    }else{
        $(".activity__item-wrapper .main.only-mob").remove()
    }
}


function generateCollectionUrl(){
    
    console.log("generateCollectionUrl!!!", configurator.activities )
    collection = calculateCollection()

    if (!configurator.activities) {
        return
    }

    if (collection <= -2) {
       
        urlCollection = "/collections/stay-x-warm-collection/"
    }


    if (collection > -2 && collection <= -1) {
        urlCollection = "/collections/stay-warm-collection/"    
    }

    if (collection > -1 && collection < 1) {
        urlCollection = "/collections/stay-warm-collection/"    
    }

    if (collection >= 1 && collection < 2) {
        urlCollection = "/collections/stay-warm-collection/"    
    }

    if (collection >= 2) {
        urlCollection = "/collections/stay-fresh-collection/"    
    }
    if (configurator.gender == "male"){
        urlCollection +="uomo"
    }else{
        urlCollection += "donna"
    }

   
    if (configurator.activities.includes("RUNNING")){
        urlCollection += "+running"
    }
    if (configurator.activities.includes("CYCLING")) {
        urlCollection += "+ciclismo"
    }
    if (configurator.activities.includes("TREKKING")) {
        urlCollection += "+outdoor-lifestyle"
    }
    if (configurator.activities.includes("HIKING")) {
        urlCollection += "+professional"
    }
    if (configurator.activities.includes("ALPINISMO")) {
        urlCollection += "+professional"
    }
    if (configurator.activities.includes("SKY/SNOW")) {
        urlCollection += "+snowsports"
    }
    if (configurator.activities.includes("MOTO")) {
        urlCollection += "+motociclismo"
    }
    if (configurator.activities.includes("TRAVEL")) {
        urlCollection += "+outdoor-lifestyle"
    }

}

//init and listeners
if ($configTemplate.length )  {
 
    $(function(){
        initConfig()

        $configGoTo.on("click", function () {
            goToPage($(this).attr("data-page"))
        })

        $configSaveEle.on("click", function () {
            saveConfig($(this).attr("data-property"), $(this).attr("data-value"))
        })


        $activityItem.on("click", function () {
            toggleActivity($(this).attr("data-value"))
        })

        $addOtherActivityBtn.on("click", function () {
            let val = $(".activity-add-input-js").val()
            let valdesk = $(".activity-add-input-js-desk").val()
            console.log(val, valdesk)
            addOtherActivity(val ? val : valdesk)
            $(".activity-add-input-js").val("")
        })

        $(document).on("click", ".other-activity-delete", function () {

            deleteOtherActivity($(this).attr("data-value"))
        })
       

        initSliders()

        removeUndesiderizedThings()
        removeDeskMobDuplicateEle()
      
    })
    
}

