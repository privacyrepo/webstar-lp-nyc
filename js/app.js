/* Template Name: Neloz - Responsive Bootstrap 4 Landing Page Template
   Author: Themesdesign
   Version: 1.0.0
   Created: Jan 2023
   File Description: Main js file
*/

(function ($) {

    'use strict';
	// STICKY
	$(window).scroll(function() {
	    var scroll = $(window).scrollTop();

	    if (scroll >= 50) {
	        $(".sticky").addClass("nav-sticky");
	    } else {
	        $(".sticky").removeClass("nav-sticky");
	    }
	});


	// SmoothLink
	$('.nav-item a, .mouse-down a').on('click', function(event) {
	    var $anchor = $(this);
	    $('html, body').stop().animate({
	        scrollTop: $($anchor.attr('href')).offset().top - 0
	    }, 1500, 'easeInOutExpo');
	    event.preventDefault();
	});


	// scrollspy
	$(".navbar-nav").scrollspy({
	    offset: 70
	});


	//owlCarousel
	$('.owl-carousel').owlCarousel({
	    autoplay:false,
	    autoplayTimeout:3000,
	    loop:true,
	    margin:10,
	    nav:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    }
	})

	// contact

	$('#contact-form').submit(function() {

	    var action = $(this).attr('action');

	    $("#message").slideUp(750, function() {
	        $('#message').hide();

	        $('#submit')
	            .before('')
	            .attr('disabled', 'disabled');

	        $.post(action, {
	                name: $('#name').val(),
	                email: $('#email').val(),
	                comments: $('#comments').val(),
	            },
	            function(data) {
	                document.getElementById('message').innerHTML = data;
	                $('#message').slideDown('slow');
	                $('#cform img.contact-loader').fadeOut('slow', function() {
	                    $(this).remove()
	                });
	                $('#submit').removeAttr('disabled');
	                if (data.match('success') != null) $('#cform').slideUp('slow');
	            }
	        );

	    });

	    return false;

	});

	// loader
	$(window).on('load', function() {
	    $('#status').fadeOut();
	    $('#preloader').delay(350).fadeOut('slow');
	    $('body').delay(350).css({
	        'overflow': 'visible'
	    });
	});

	const form = document.getElementById('registrationForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                
                const modalMessage = document.getElementById('modalMessage');
                modalMessage.textContent = data.message;
                
                const responseModal = new bootstrap.Modal(document.getElementById('responseModal'));
                responseModal.show();
            })
            .catch(error => {
                console.error('Error:', error);
                const modalMessage = document.getElementById('modalMessage');
                modalMessage.textContent = 'An error occurred while submitting the form. Please try again.';
                
                const responseModal = new bootstrap.Modal(document.getElementById('responseModal'));
                responseModal.show();
            });
        });
	
})(jQuery)