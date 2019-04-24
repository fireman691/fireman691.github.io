$(function() {

});


$(window).resize(function() {
	waitForFinalEvent(function() {

	}, timeToWaitForLast, "windowResize");
});