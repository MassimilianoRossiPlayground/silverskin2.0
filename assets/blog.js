(function(document) {

    var selectors = {
        navBlog: '.nav-blog'
    };

    var navBlog = document.querySelector(selectors.navBlog);

    window.onscroll = function() {scrollDown()};

    function scrollDown() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            navBlog.classList.remove("hidden")
        } else {
            navBlog.classList.add("hidden")
        }
    }

})(document);
  