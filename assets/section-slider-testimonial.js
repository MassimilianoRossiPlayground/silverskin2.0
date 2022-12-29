(function(document) {

    var selectors = {
        sliderTestimonial: '.slider-testimonial-swiper',
    };

    var sliderTestimonial = document.querySelector(selectors.sliderTestimonial);

    document.addEventListener("DOMContentLoaded", function(){

        console.log(sliderTestimonial.id)

        const swiperTestimonial = new Swiper(sliderTestimonial, {
            slidesPerView: 3,
            spaceBetween: 30,
            breakpoints: {
              310: {
                slidesPerView: 1,
                loop: true,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
              }
            }
        }) 
      
    })


    // if (!sliderTestimonial) {

    //     var sliderTestimonial = document.querySelectorAll(selectors.sliderTestimonial);
    //     var buildSwiperSlider = sliderElm => {
    //         var sliderTestimonialIdentifier = sliderElm.dataset.id;
    //         console.log(sliderTestimonialIdentifier)
    //         return new Swiper(`#${sliderElm.id}`, {
    //             slidesPerView: 3,
    //             spaceBetween: 30,
    //             loop: true,
    //             breakpoints: {
    //                 768: {
    //                     slidesPerView: 1,
    //                     spaceBetween: 30,
    //                 },
    //                 1024: {
    //                     slidesPerView: 3,
    //                     spaceBetween: 30,
    //                 }
    //             }
    //         });
    //     }

    //     sliderTestimonial.forEach(slider => buildSwiperSlider(slider));

    // }

})(document);
  