$(document).ready(function() {
	var slider = $(".slider");
	var slidesContainer = $(".slides-container");
	var pagination = $(".slider-pagi")

	var curSlide = 0;
	var totalSlides = $(".slides-container article").length;
	var autoInterval = 2000;
	var autoSlideTimeout;
	var isHover = false;

	// Create pagination bullet points when page loads
	createPagi();

	// When hover on slider, stop autoplay
	slider.hover(
		function() {
			isHover = true;
			stopAuto();
	},
	// When not hover on slider, start autoplay
		function() {
			isHover = false;
			startAuto();
	});

	function startAuto() {
		autoSlideTimeout = setTimeout(function() {
			curSlide ++;
			if(curSlide > totalSlides - 1) {
				curSlide = 0;
			}
			changeSlides();
		}, autoInterval);
	}

	// Recursion
	function changeSlides() {
		window.clearTimeout(autoSlideTimeout);

		// Remove class active from all elements that have pagi-bullets class
		$(".pagi-bullets").removeClass("active");

		// Add class active to current slide
		$(".bullet-" + curSlide).addClass("active");
		slidesContainer.css("transform", "translateX(" + -curSlide * 100 + "%)");

		// Autoplay only when mouse is not hover on slider
		if(isHover === false) {
			startAuto();
		}
	}

	function stopAuto() {
		window.clearTimeout(autoSlideTimeout);
	}

	function navigateLeft() {
		if (curSlide > 0) {
			curSlide --;
		}
		changeSlides();
	}

	function navigateRight() {
		if (curSlide < numOfSlides) {
			curSlide ++;
		}
		changeSlides();
	}

	// Create pagination bullet points when page loads
	function createPagi() {
		for(var i = 0; i < totalSlides; i ++) {
			var $li = $("<li class='pagi-bullets'></li>");
			$li.addClass("bullet-" + i).data("page", i);
			if(i === 0) {
				$li.addClass("active");
			}
			pagination.append($li);
		}
	}

	$(document).on("click", ".pagi-bullets", function() {
		curSlide = $(this).data("page");
		changeSlides();
	});
});
