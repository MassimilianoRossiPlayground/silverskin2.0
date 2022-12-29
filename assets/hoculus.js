window.hoculus = window.hoculus || {};

// if (console && console.log) {
// 	console.log(
// 		"Improved by %cHoculus srl %con %cShopify %c- %c" +
// 			Shopify.theme.name +
// 			" %c -> https://www.hoculus.com",
// 		"color: red; font-weight: bold",
// 		"color: unset",
// 		"color: green",
// 		"color: unset",
// 		"color: blue",
// 		"color: unset; font-weight: bold"
// 	);
// }
hoculus.firstInt = false;
hoculus.utils = {
	getScript: function (source, callback) {
		var script = document.createElement("script");
		var prior = document.getElementsByTagName("script")[0];
		script.defer = 1;

		script.onload = script.onreadystatechange = function (_, isAbort) {
			if (
				isAbort ||
				!script.readyState ||
				/loaded|complete/.test(script.readyState)
			) {
				script.onload = script.onreadystatechange = null;
				script = undefined;

				if (!isAbort && callback) setTimeout(callback, 0);
			}
		};
		script.src = source;
		prior.parentNode.insertBefore(script, prior);
	},
	getScriptAsync: async function (source) {
		return await new Promise(function (resolve, reject) {
			var script = document.createElement("script");
			var prior = document.getElementsByTagName("script")[0];
			script.defer = 1;

			script.onload = script.onreadystatechange = function (_, isAbort) {
				if (
					isAbort ||
					!script.readyState ||
					/loaded|complete/.test(script.readyState)
				) {
					script.onload = script.onreadystatechange = null;
					script = undefined;

					if (!isAbort) setTimeout(resolve(true), 0);
				}
			};

			script.src = source;
			prior.parentNode.insertBefore(script, prior);
		});
	},
	insertCss: async function(css){
		return await new Promise(function (resolve, reject) {
	        var link = document.createElement('link');
	        link.setAttribute('rel', 'stylesheet');
	        link.setAttribute('href', css);
	        document.head.appendChild(link);
	        resolve(true)
    	})
    },
	domready: function (callback) {
		if (document.readyState == "complete") callback();
		else document.addEventListener("DOMContentLoaded", callback);
	},
	enableScripts: function(filename, filetype){
	    if (filetype=="js"){ //if filename is a external JavaScript file
	        var fileref=document.createElement('script')
	        fileref.setAttribute("type","text/javascript")
	        fileref.setAttribute("src", filename)
	    }
	    typeof fileref!="undefined" && document.getElementsByTagName("head")[0].appendChild(fileref)
  	},
	lazyImages: function() {
        document.querySelectorAll("img.hoculus-lazy").forEach(el=> {
            ((el.dataset.src && el.setAttribute("src", el.dataset.src)) || (el.dataset.style && el.setAttribute("style", el.dataset.style)))
        })
    },
    lazyVideos: function(){
    	var lazyVideos = [].slice.call(document.querySelectorAll("video.hoculus-lazy"));

		  if ("IntersectionObserver" in window) {
		    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
		      entries.forEach(function(video) {
		        if (video.isIntersecting) {
		          for (var source in video.target.children) {
		            var videoSource = video.target.children[source];
		            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
		              videoSource.src = videoSource.dataset.src;
		            }
		          }

		          video.target.load();
		          video.target.classList.remove("lazy");
		          lazyVideoObserver.unobserve(video.target);
		        }
		      });
		    });

		    lazyVideos.forEach(function(lazyVideo) {
		      lazyVideoObserver.observe(lazyVideo);
		    });
		  }
    },
	onInteraction: function(){
		if(!hoculus.firstInt){
			hoculus.hotjar(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
			hoculus.firstInt = true;
		}
	},
	onLoad: async function () {
		const res = await Promise.allSettled([
			hoculus.scripts && hoculus.scripts.forEach(script => {
				hoculus.utils.getScriptAsync(script)
			}),
			hoculus.stylesheets && hoculus.stylesheets.forEach(style => {
				hoculus.utils.insertCss(style)
			})
		])

		hoculus.utils.lazyImages();
		hoculus.utils.lazyVideos();
		$('a[href="#"]').click(function (e) {
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		});

		["click","scroll","touchstart","mousemove"].forEach( function(evt) {
            document.addEventListener(evt, hoculus.utils.onInteraction, false);
        });
	}
};
hoculus.hotjar = function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1571249,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
}
hoculus.utils.domready(hoculus.utils.onLoad());