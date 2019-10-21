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
jQuery(document).ready(function($){
	//trigger the animation - open modal window
	$('[data-type="modal-trigger"]').on('click', function(){
		var actionBtn = $(this),
			scaleValue = retrieveScale(actionBtn.next('.cd-modal-bg'));
		
		actionBtn.addClass('to-circle');
		actionBtn.next('.cd-modal-bg').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
		});

		//if browser doesn't support transitions...
		if(actionBtn.parents('.no-csstransitions').length > 0 ) animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
	});

	//trigger the animation - close modal window
	$('.cd-section .cd-modal-close').on('click', function(){
		closeModal();
	});
	$(document).keyup(function(event){
		if(event.which=='27') closeModal();
	});

	$(window).on('resize', function(){
		//on window resize - update cover layer dimention and position
		if($('.cd-section.modal-is-visible').length > 0) window.requestAnimationFrame(updateLayer);
	});

	function retrieveScale(btn) {
		var btnRadius = btn.width()/2,
			left = btn.offset().left + btnRadius,
			top = btn.offset().top + btnRadius - $(window).scrollTop(),
			scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());

		btn.css('position', 'fixed').velocity({
			top: top - btnRadius,
			left: left - btnRadius,
			translateX: 0,
		}, 0);

		return scale;
	}

	function scaleValue( topValue, leftValue, radiusValue, windowW, windowH) {
		var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
			maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
		return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
	}

	function animateLayer(layer, scaleVal, bool) {
		layer.velocity({ scale: scaleVal }, 400, function(){
			$('body').toggleClass('overflow-hidden', bool);
			(bool) 
				? layer.parents('.cd-section').addClass('modal-is-visible').end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend')
				: layer.removeClass('is-visible').removeAttr( 'style' ).siblings('[data-type="modal-trigger"]').removeClass('to-circle');
		});
	}

	function updateLayer() {
		var layer = $('.cd-section.modal-is-visible').find('.cd-modal-bg'),
			layerRadius = layer.width()/2,
			layerTop = layer.siblings('.btn').offset().top + layerRadius - $(window).scrollTop(),
			layerLeft = layer.siblings('.btn').offset().left + layerRadius,
			scale = scaleValue(layerTop, layerLeft, layerRadius, $(window).height(), $(window).width());
		
		layer.velocity({
			top: layerTop - layerRadius,
			left: layerLeft - layerRadius,
			scale: scale,
		}, 0);
	}

	function closeModal() {
		var section = $('.cd-section.modal-is-visible');
		section.removeClass('modal-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			animateLayer(section.find('.cd-modal-bg'), 1, false);
		});
		//if browser doesn't support transitions...
		if(section.parents('.no-csstransitions').length > 0 ) animateLayer(section.find('.cd-modal-bg'), 1, false);
	}
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

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener("click",  () => {
	navLinks.classList.toggle("open");
	
});

navLinks.addEventListener("click",  () => {
	navLinks.classList.toggle("open");
	
});