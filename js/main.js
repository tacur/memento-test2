
 /*
 * BG Loaded
 * Copyright (c) 2014 Jonathan Catmull
 * Licensed under the MIT license.
 */
 (function($){
 	$.fn.bgLoaded = function(custom) {
	 	var self = this;

		// Default plugin settings
		var defaults = {
			afterLoaded : function(){
				this.addClass('bg-loaded');
			}
		};

		// Merge default and user settings
		var settings = $.extend({}, defaults, custom);

		// Loop through element
		self.each(function(){
			var $this = $(this),
				bgImgs = $this.css('background-image').split(', ');
			$this.data('loaded-count',0);
			$.each( bgImgs, function(key, value){
				var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
				$('<img/>').attr('src', img).load(function() {
					$(this).remove(); // prevent memory leaks
					$this.data('loaded-count',$this.data('loaded-count')+1);
					if ($this.data('loaded-count') >= bgImgs.length) {
						settings.afterLoaded.call($this);
					}
				});
			});

		});
	};
})(jQuery);


(function ($) {
  $(document).ready(function(){

    // hide .navbar first
    $(".navbar1").hide();

    // fade in .navbar
    $(function () {
        $(window).scroll(function () {

                 // set distance user needs to scroll before we start fadeIn
            if ($(this).scrollTop() > 40) {
                $('.navbar1').fadeIn();
            } else {
                $('.navbar1').fadeOut();
            }
        });
	});
	$(function () {
        $(window).scroll(function () {

                 // set distance user needs to scroll before we start fadeIn
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });
	});
	$(function() {
		$('a[href*=#]').on('click', function(e) {
		  e.preventDefault();
		  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
		});
	  });

});
  /*
  $(document).ready(function(){
  	// HIDE LOGO 

    // hide .navbar first
    $(".logo_mitte").hide();

    // fade in .navbar
    $(function () {
        $(window).scroll(function () {

                 // set distance user needs to scroll before we start fadeIn
            if ($(this).scrollTop() > 40) {
                $('.logo_mitte').fadeIn();
                $('.logo_links').fadeOut();
            } else {
            	$('.logo_links').fadeIn();
                $('.logo_mitte').fadeOut();

            }
        });
    });

});*/
// ####### Frontpage mit Menu/Navbar:
  }(jQuery));
  (function() {
	var pushingNavTrigger = document.getElementsByClassName('js-cd-nav-trigger');
	
	if(pushingNavTrigger.length > 0) {
		var mainContent = document.getElementsByClassName('cd-main__content')[0],
			navAnimating = false;
		
		pushingNavTrigger[0].addEventListener('click', function(event) {
			event.preventDefault();
			if(navAnimating) return; // already animating -> do not toggle
			navAnimating = true;
			Util.toggleClass(document.body, 'nav-is-open', !Util.hasClass(document.body, 'nav-is-open'));
		});

		mainContent.addEventListener('transitionend', function(){
			navAnimating = false; // wait for the ened of animation to reset the variable
		});
	}
}());


// #######
(function ($) {
$(document).ready(function(){
	// Funktionen für das Scroll-Verhalten
	$(function () {
		$('.cd-nav-trigger').click(function () { // Klick auf den Button
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
	$(function () {
		$('.back-to-top').click(function () { // Klick auf den Button
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
	$("#menu_nav").click(function() {
    	$('html, body').animate({
        	scrollTop: $("#team").offset().top
    	}, 2000);
	});
	$("#anfahrt_nav").click(function() {
    	$('html, body').animate({
        	scrollTop: $("#anfahrt").offset().top
    	}, 2000);
	});
	$("#kontakt_nav").click(function() {
    	$('html, body').animate({
        	scrollTop: $("#kontakt").offset().top
    	}, 2000);
	});

});

}(jQuery));

//// Modal NEU Funktionen /////
jQuery(document).ready(function(){
	var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
		coverLayer = $('.cd-cover-layer');
	
	/*
		convert a cubic bezier value to a custom mina easing
		http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
	*/
	var duration = 600,
		epsilon = (1000 / 60 / duration) / 4,
		firstCustomMinaAnimation = bezier(.63,.35,.48,.92, epsilon);

	modalTriggerBts.each(function(){
		initModal($(this));
	});

	function initModal(modalTrigger) {
		var modalTriggerId =  modalTrigger.attr('id'),
			modal = $('.cd-modal[data-modal="'+ modalTriggerId +'"]'),
			svgCoverLayer = modal.children('.cd-svg-bg'),
			paths = svgCoverLayer.find('path'),
			pathsArray = [];
		//store Snap objects
		pathsArray[0] = Snap('#'+paths.eq(0).attr('id')),
		pathsArray[1] = Snap('#'+paths.eq(1).attr('id')),
		pathsArray[2] = Snap('#'+paths.eq(2).attr('id'));

		//store path 'd' attribute values	
		var pathSteps = [];
		pathSteps[0] = svgCoverLayer.data('step1');
		pathSteps[1] = svgCoverLayer.data('step2');
		pathSteps[2] = svgCoverLayer.data('step3');
		pathSteps[3] = svgCoverLayer.data('step4');
		pathSteps[4] = svgCoverLayer.data('step5');
		pathSteps[5] = svgCoverLayer.data('step6');
		
		//open modal window
		modalTrigger.on('click', function(event){
			event.preventDefault();
			modal.addClass('modal-is-visible');
			coverLayer.addClass('modal-is-visible');
			animateModal(pathsArray, pathSteps, duration, 'open');
		});

		//close modal window
		modal.on('click', '.modal-close', function(event){
			event.preventDefault();
			modal.removeClass('modal-is-visible');
			coverLayer.removeClass('modal-is-visible');
			animateModal(pathsArray, pathSteps, duration, 'close');
		});
	}

	function animateModal(paths, pathSteps, duration, animationType) {
		var path1 = ( animationType == 'open' ) ? pathSteps[1] : pathSteps[0],
			path2 = ( animationType == 'open' ) ? pathSteps[3] : pathSteps[2],
			path3 = ( animationType == 'open' ) ? pathSteps[5] : pathSteps[4];
		paths[0].animate({'d': path1}, duration, firstCustomMinaAnimation);
		paths[1].animate({'d': path2}, duration, firstCustomMinaAnimation);
		paths[2].animate({'d': path3}, duration, firstCustomMinaAnimation);
	}

	function bezier(x1, y1, x2, y2, epsilon){
		//https://github.com/arian/cubic-bezier
		var curveX = function(t){
			var v = 1 - t;
			return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
		};

		var curveY = function(t){
			var v = 1 - t;
			return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
		};

		var derivativeCurveX = function(t){
			var v = 1 - t;
			return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
		};

		return function(t){

			var x = t, t0, t1, t2, x2, d2, i;

			// First try a few iterations of Newton's method -- normally very fast.
			for (t2 = x, i = 0; i < 8; i++){
				x2 = curveX(t2) - x;
				if (Math.abs(x2) < epsilon) return curveY(t2);
				d2 = derivativeCurveX(t2);
				if (Math.abs(d2) < 1e-6) break;
				t2 = t2 - x2 / d2;
			}

			t0 = 0, t1 = 1, t2 = x;

			if (t2 < t0) return curveY(t0);
			if (t2 > t1) return curveY(t1);

			// Fallback to the bisection method for reliability.
			while (t0 < t1){
				x2 = curveX(t2);
				if (Math.abs(x2 - x) < epsilon) return curveY(t2);
				if (x > x2) t0 = t2;
				else t1 = t2;
				t2 = (t1 - t0) * .5 + t0;
			}

			// Failure
			return curveY(t2);

		};
	};
});

//// Modal Impressum Funktionen /////
jQuery(document).ready(function(){
	var modalTriggerBts1 = $('a[data-type="cd-modal-trigger1"]'),
		coverLayer1 = $('.cd-cover-layer1');
	
	/*
		convert a cubic bezier value to a custom mina easing
		http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
	*/
	var duration1 = 600,
		epsilon1 = (1000 / 60 / duration1) / 4,
		firstCustomMinaAnimation1 = bezier(.63,.35,.48,.92, epsilon1);

	modalTriggerBts1.each(function(){
		initModal($(this));
	});

	function initModal(modalTrigger1) {
		var modalTriggerId1 =  modalTrigger1.attr('id'),
			modal1 = $('.cd-modal1[data-modal="'+ modalTriggerId1 +'"]'),
			svgCoverLayer1 = modal1.children('.cd-svg-bg1'),
			paths1 = svgCoverLayer1.find('path'),
			pathsArray1 = [];
		//store Snap objects
		pathsArray1[0] = Snap('#'+paths1.eq(0).attr('id')),
		pathsArray1[1] = Snap('#'+paths1.eq(1).attr('id')),
		pathsArray1[2] = Snap('#'+paths1.eq(2).attr('id'));

		//store path 'd' attribute values	
		var pathSteps1 = [];
		pathSteps1[0] = svgCoverLayer1.data('step1');
		pathSteps1[1] = svgCoverLayer1.data('step2');
		pathSteps1[2] = svgCoverLayer1.data('step3');
		pathSteps1[3] = svgCoverLayer1.data('step4');
		pathSteps1[4] = svgCoverLayer1.data('step5');
		pathSteps1[5] = svgCoverLayer1.data('step6');
		
		//open modal window
		modalTrigger1.on('click', function(event1){
			event1.preventDefault();
			modal1.addClass('modal-is-visible1');
			coverLayer1.addClass('modal-is-visible1');
			animateModal(pathsArray1, pathSteps1, duration1, 'open');
		});

		//close modal window
		modal1.on('click', '.modal-close1', function(event1){
			event1.preventDefault();
			modal1.removeClass('modal-is-visible1');
			coverLayer1.removeClass('modal-is-visible1');
			animateModal(pathsArray1, pathSteps1, duration1, 'close');
		});
	}

	function animateModal(paths1, pathSteps1, duration1, animationType) {
		var path11 = ( animationType == 'open' ) ? pathSteps1[1] : pathSteps1[0],
			path22 = ( animationType == 'open' ) ? pathSteps1[3] : pathSteps1[2],
			path33 = ( animationType == 'open' ) ? pathSteps1[5] : pathSteps1[4];
		paths1[0].animate({'d': path11}, duration1, firstCustomMinaAnimation1);
		paths1[1].animate({'d': path22}, duration1, firstCustomMinaAnimation1);
		paths1[2].animate({'d': path33}, duration1, firstCustomMinaAnimation1);
	}

	function bezier(x1, y1, x2, y2, epsilon1){
		//https://github.com/arian/cubic-bezier
		var curveX = function(t){
			var v = 1 - t;
			return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
		};

		var curveY = function(t){
			var v = 1 - t;
			return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
		};

		var derivativeCurveX = function(t){
			var v = 1 - t;
			return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
		};

		return function(t){

			var x = t, t0, t1, t2, x2, d2, i;

			// First try a few iterations of Newton's method -- normally very fast.
			for (t2 = x, i = 0; i < 8; i++){
				x2 = curveX(t2) - x;
				if (Math.abs(x2) < epsilon1) return curveY(t2);
				d2 = derivativeCurveX(t2);
				if (Math.abs(d2) < 1e-6) break;
				t2 = t2 - x2 / d2;
			}

			t0 = 0, t1 = 1, t2 = x;

			if (t2 < t0) return curveY(t0);
			if (t2 > t1) return curveY(t1);

			// Fallback to the bisection method for reliability.
			while (t0 < t1){
				x2 = curveX(t2);
				if (Math.abs(x2 - x) < epsilon1) return curveY(t2);
				if (x > x2) t0 = t2;
				else t1 = t2;
				t2 = (t1 - t0) * .5 + t0;
			}

			// Failure
			return curveY(t2);

		};
	};
});
////// ##### PICTURE- SLIDER #######
jQuery(document).ready(function($){
	var duration = ( $('.no-csstransitions').length > 0 ) ? 0 : 300;
	//define a svgClippedSlider object
	function svgClippedSlider(element) {
		this.element = element;
		this.slidesGallery = this.element.find('.gallery').children('li');
		this.slidesCaption = this.element.find('.caption').children('li');
		this.slidesNumber = this.slidesGallery.length;
		this.selectedSlide = this.slidesGallery.filter('.selected').index();
		this.arrowNext = this.element.find('.navigation').find('.next');
		this.arrowPrev = this.element.find('.navigation').find('.prev');

		this.visibleSlidePath = this.element.data('selected');
		this.lateralSlidePath = this.element.data('lateral');

		this.bindEvents();
	}

	svgClippedSlider.prototype.bindEvents = function() {
		var self = this;
		//detect click on one of the slides
		this.slidesGallery.on('click', function(event){
			if( !$(this).hasClass('selected') ) {
				//determine new slide index and show it
				var newSlideIndex = ( $(this).hasClass('left') )
					? self.showPrevSlide(self.selectedSlide - 1)
					: self.showNextSlide(self.selectedSlide + 1);
			}
		});
	}

	svgClippedSlider.prototype.showPrevSlide = function(index) {
		var self = this;
		this.selectedSlide = index;
		this.slidesGallery.eq(index + 1).add(this.slidesCaption.eq(index + 1)).removeClass('selected').addClass('right');
		this.slidesGallery.eq(index).add(this.slidesCaption.eq(index)).removeClass('left').addClass('selected');

		//morph the svg cliph path to reveal a different region of the image
		Snap("#cd-morphing-path-"+(index+1)).animate({'d': self.visibleSlidePath}, duration, mina.easeinout);
		Snap("#cd-morphing-path-"+(index+2)).animate({'d': self.lateralSlidePath}, duration, mina.easeinout);

		if( index - 1 >= 0  ) this.slidesGallery.eq(index - 1).add(this.slidesCaption.eq(index - 1)).removeClass('left-hide').addClass('left');
		if( index + 2 < this.slidesNumber ) this.slidesGallery.eq(index + 2).add(this.slidesCaption.eq(index + 2)).removeClass('right');
	
		( index <= 0 ) && this.element.addClass('prev-hidden');
		this.element.removeClass('next-hidden');

		//animate prev arrow on click
		this.arrowPrev.addClass('active').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			self.arrowPrev.removeClass('active');
		});
	}

	svgClippedSlider.prototype.showNextSlide = function(index) {
		var self = this;
		this.selectedSlide = index;
		this.slidesGallery.eq(index - 1).add(this.slidesCaption.eq(index - 1)).removeClass('selected').addClass('left');
		this.slidesGallery.eq(index).add(this.slidesCaption.eq(index)).removeClass('right').addClass('selected');

		//morph the svg cliph path to reveal a different region of the image
		Snap("#cd-morphing-path-"+(index+1)).animate({'d': self.visibleSlidePath}, duration, mina.easeinout);
		Snap("#cd-morphing-path-"+(index)).animate({'d': self.lateralSlidePath}, duration, mina.easeinout);

		if( index - 2 >= 0  ) this.slidesGallery.eq(index - 2).add(this.slidesCaption.eq(index - 2)).removeClass('left').addClass('left-hide');
		if( index + 1 < this.slidesNumber ) this.slidesGallery.eq(index + 1).add(this.slidesCaption.eq(index + 1)).addClass('right');
		
		( index + 1 >= this.slidesNumber ) && this.element.addClass('next-hidden');
		this.element.removeClass('prev-hidden');

		//animate next arrow on click
		this.arrowNext.addClass('active').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			self.arrowNext.removeClass('active');
		});
	}

	$('.cd-svg-clipped-slider').each(function(){
		//create a svgClippedSlider object for each .cd-svg-clipped-slider
		new svgClippedSlider($(this));
	});
});