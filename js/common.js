function updateViewportDimensions() {
	var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight || e.clientHeight || g.clientHeight;

	return {
		width:x,
		height:y
	};
}
var viewport = updateViewportDimensions();

var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

var timeToWaitForLast = 100;

jQuery(document).ready(function($) {

	var breakpoints = {
		xs: 640,
		sm: 768,
		md: 992,
		lg: 1200,
		xl: 1500
	}

	var sliderParameters = {
		// infinite: false,
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="pm-icon pm-icon--chevron-left"></i></button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="pm-icon pm-icon--chevron-right"></i></button>',
		swipeToSlide: true,
		adaptiveHeight: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: breakpoints.md,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: breakpoints.sm,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		]
	};

	$('.js-slider').slick(sliderParameters);

	var isSliderActive = true;


	$(document).on('click', '.js-show-all-services', function(event) {
		event.preventDefault();
		if (isSliderActive) {
			$('.js-slider').slick('unslick');
		} else {
			$('.js-slider').slick(sliderParameters);
		}

		var txt = $(this).html();
		var dataText = $(this).attr('data-text');
		$(this).attr('data-text', txt);
		$(this).html(dataText);

		isSliderActive = !isSliderActive;
	});

});


jQuery(window).resize(function() {
	waitForFinalEvent(function() {

		jQuery('.js-slider').slick('setPosition');
		jQuery('.slick-list').removeAttr('style');

	}, timeToWaitForLast, "windowResize");
});