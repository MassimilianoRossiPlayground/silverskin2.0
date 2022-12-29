(function(document) {

    var selectors = {
        containerBlogs: '.container-blogs',
        blog1List: '#blog-1-list',
        navBlog: '.nav-blog'
    };

    var containerBlogs = document.querySelector(selectors.containerBlogs);
    var blog1List = document.querySelector(selectors.blog1List);
    var navBlog = document.querySelector(selectors.navBlog);

    var blogCards_style = containerBlogs.currentStyle || window.getComputedStyle(containerBlogs)
    var blogCards_margin_left = blogCards_style.marginLeft
    blog1List.style.marginLeft = blogCards_margin_left;

    window.addEventListener('resize', function() {
        blogCards_margin_left = blogCards_style.marginLeft
        blog1List.style.marginLeft = blogCards_margin_left;

    }, true);

    const swiperIntro = new Swiper(blog1List, {
        slidesPerView: 1.2,
        spaceBetween: 10,
        loop: false,
        breakpoints: {
            768: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 10,
            }
        }
    })

    window.onscroll = function() {scrollDown()};

    function scrollDown() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            navBlog.classList.remove("hidden")
        } else {
            navBlog.classList.add("hidden")
        }
    }

})(document);
  