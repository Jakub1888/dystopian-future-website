
(function($) {
 

// FADE IN ON SCROLL
//-------------------------------------

  $(document).on('scroll', function () {
      var pageTop = $(document).scrollTop()
      var pageBottom = pageTop + $(window).height() - 20
      var tags = $('.media')
    
      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i]
    
        if ($(tag).position().top < pageBottom) {
          $(tag).addClass("visible")
        } else {
          $(tag).removeClass("visible")
        }
      }
    });


//SELECTED
//------------------------------------

  var list = $('.controls li')

  list.on('click', function() {
  
      $(this).toggleClass('selected').siblings().removeClass('selected');
  });

//--------------------------------------
//CONTROLS
  
  $('#header-2 ul a').on('click', function(event){
      event.preventDefault();

      var a = $(this),
          href = a.attr('href'),
          li = a.parent();

          if ( $('#header-2 ul').find('.selected').is( li ) ) return;

      $('#header-2 ul').find('.selected')
      li.addClass('.selected')
      .siblings().removeClass('.selected');

      $('section').removeClass('active');

  
      $(href).addClass('active').hide().fadeIn(400);
      
  });


  //--------------------------------------
  //LIGHTBOX
    
  $('section a').lightbox();
    
	//--------------------------------------------------
	// RETURN TO THE TOP

	var returnTop = $('<a>', {
		href: '#home',
		class: 'return-top',
		html: '<i class="fa fa-caret-up fa-5x"></i>'
	});

	returnTop
		.hide()
		.appendTo('body')
		.on('click', function () {
			$('body, html').animate({ scrollTop: 0 }, 500);
		});

	var win = $(window);
	win.on('scroll', function() {
		if ( win.scrollTop() >=1200 ) returnTop.fadeIn();
		else returnTop.hide();
  });

})(jQuery);