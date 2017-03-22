$(document).ready(function() {
	var slider = $(".slider");
	var slides = $(".slides-container article");

	var curSlide = 0;
	var totalSlides = slides.length;
	var autoSlideTimeout;
	var autoInterval = 2000;
	var isHover = false;

	var shrinkedWidth = 10;
	var expandedWidth = 100 - shrinkedWidth * (totalSlides - 1);

	slider.hover(
		function() {
			isHover = true;
			stopAuto();
	},
		function() {
			isHover = false;
			startAuto();
	});

	// Assign each slide a page data
	createPagi();

	function createPagi() {
		for(var i = 0; i < totalSlides; i ++) {
			$(".slide-" + i).data("page", i);
		}
	}

	function startAuto() {
		autoSlideTimeout = setTimeout(function() {
			curSlide ++;
			if(curSlide > totalSlides - 1) {
				curSlide = 0;
			}
			changeSlides();
		}, autoInterval);
	}

	function stopAuto() {
		window.clearTimeout(autoSlideTimeout);
	}

	function changeSlides() {
		window.clearTimeout(autoSlideTimeout);

		// Shrink all slides width first
		slides.css("width", shrinkedWidth + "%");

		// Expand current slide width
		$(".slide-" + curSlide).css("width", expandedWidth + "%");

		if(!isHover) {
			startAuto();
		}
	}

	slides.click(function() {

		// Get page data of clicked slide
		curSlide = $(this).data("page");

		changeSlides();
	});
});
