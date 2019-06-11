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

	var sliderParameters = {
		dots: true,
		infinite: false,
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="icon icon--chevron-left"></i></button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="icon icon--chevron-right"></i></button>',
		swipeToSlide: false,
		adaptiveHeight: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendArrows: $('.js-slider-nav'),
		appendDots: $('.js-slider-nav')
	};

	$('.js-slider').slick(sliderParameters);

});


jQuery(window).resize(function() {
	waitForFinalEvent(function() {

		jQuery('.js-slider').slick('setPosition');
		jQuery('.slick-list').removeAttr('style');

	}, timeToWaitForLast, "windowResize");
});