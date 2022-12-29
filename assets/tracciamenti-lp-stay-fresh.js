$(document).on("click", ".template-lp-stay-fresh .intro-box .js-close-intro", function() {
    console.log("close-intro")
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
    'event': 'lp-stay-fresh--close-intro'
    });
})

$(document).on("click", ".template-lp-stay-fresh .stay-fresh-anchor .js-anchor-link", function() {
    var nav_item = $(this).attr("data-attr")
    console.log("nav-fresh--"+nav_item)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
    'event': 'lp-stay-fresh--anchor-link--'+nav_item
    });
})

$(document).on("click", ".template-lp-stay-fresh .stay-fresh-anchor .shop-link", function() {
    console.log("shop-link")
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
    'event': 'lp-stay-fresh--anchor-link--shop-link'
    });
})

$(document).on("click", ".template-lp-stay-fresh .layer-product-container .custom-btn", function() {
    console.log("cta-buy-now")
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
    'event': 'lp-stay-fresh--cta-buy-now'
    });
})

$(document).on("click", ".template-lp-stay-fresh .box-story .custom-btn", function() {
    console.log("discover-technology")
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
    'event': 'lp-stay-fresh--cta-discover-technology'
    });
})
