
(function($) {

	var settings = {

		// Header (homepage only)
			header: {
				fullScreen: true,
				fadeIn: true,
				fadeDelay: 0
			},

	};

	skel.init({
		reset: 'full',
		breakpoints: {
			'global':	{ range: '*', href: 'assets/css/style.css', containers: 1400, grid: { gutters: 48 } },
			'wide':		{ range: '-1680', href: 'assets/css/style-wide.css', containers: 1200 },
			'normal':	{ range: '-1280', href: 'assets/css/style-normal.css', containers: '100%', grid: { gutters: 36 } },
			'narrow':	{ range: '-960', href: 'assets/css/style-narrow.css', grid: { gutters: 32 } },
			'narrower': { range: '-840', href: 'assets/css/style-narrower.css', containers: '100%!', grid: { collapse: true } },
			'mobile':	{ range: '-736', href: 'assets/css/style-mobile.css', grid: { gutters: 20 }, viewport: { scalable: false } }
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header =  $('#header');

		$body.addClass('is-loading');

		// Disable animations/transitions until the page has loaded.
			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Footer.

			const year = new Date().getFullYear();
			$(".copyright .year").text(year);

		// Header.
			if ($body.hasClass('homepage')) {

				if (settings.header.fullScreen) {

					$window.bind('resize.helios', function() {
						window.setTimeout(function() {
							var s = $header.children('.inner');
							var sh = s.outerHeight(), hh = $window.height(), h = Math.ceil((hh - sh) / 2) + 1;

							$header
								.css('padding-top', h)
								.css('padding-bottom', h);
						}, 0);
					}).trigger('resize');

				}

				if (settings.header.fadeIn) {

					$.n33_preloadImage = function(url, onload) { var $img = $('<img />'), _IEVersion = (navigator.userAgent.match(/MSIE ([0-9]+)\./) ? parseInt(RegExp.$1) : 99); $img.attr('src', url); if ($img.get(0).complete || _IEVersion < 9) (onload)(); else $img.load(onload); };

					$('<div class="overlay" />').appendTo($header);

					$window
						.load(function() {
							var imageURL = $header.css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, "");

							$.n33_preloadImage(imageURL, function() {

								if (skel.vars.IEVersion < 10)
									$header.children('.overlay').fadeOut(2000);
								else
									window.setTimeout(function() {
										$header.addClass('ready');
									}, settings.header.fadeDelay);

							});
						});

				}

			}

	});

})(jQuery);

(function(){var e,t=jQuery(window),n=[],r=100,i=150,s=function(){var e=n.length,r=t.scrollTop()+t.height()-i,s,o;for(s=0;s<e;s++)o=n[s],!o.state&&r>o.o.offset().top&&(o.state=!0,o.fn())};t.load(function(){t.on("scroll resize",function(){window.clearTimeout(e),e=window.setTimeout(function(){s()},r)}).trigger("resize")}),jQuery.fn.onVisible=function(e,t){n.push({o:jQuery(this),fn:e,pad:t?t:i,state:!1})}})();
