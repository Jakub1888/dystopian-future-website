
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


    //listeners
    document.addEventListener('keydown', keyPush)

    //canvas
    const canvas = document.querySelector("canvas");
    const title = document.querySelector("h1");
    const ctx = canvas.getContext("2d");

    //game
    let gameIsRunning = true;

    const fps = 15;
    const tileSize = 50;
    const tileCountX = canvas.width / tileSize;
    const tileCountY = canvas.height / tileSize;

    let score = 0;

    //player
    let snakeSpeed = tileSize;
    let snakePosX = 0;
    let snakePosY = canvas.height / 2;

    let velocityX = 1;
    let velocityY = 0;

    let tail = [];
    let snakeLength = 2;

    //food
    let foodPosX = 0;
    let foodPosY = 0;

    //loop
    function gameLoop(){
        if ( gameIsRunning ) {
            drawSnake();
            moveSnake();
            setTimeout(gameLoop, 1000 / fps);
        }
    }

    resetFood();
    gameLoop();

    // Move Snake
    //--------------------------
    function moveSnake() {

        snakePosX += snakeSpeed * velocityX;
        snakePosY += snakeSpeed * velocityY;

        //wall collision
        if ( snakePosX > canvas.width - tileSize) {
            snakePosX = 0;
        }
        if ( snakePosX < 0) {
            snakePosX = canvas.width;
        }
        if ( snakePosY > canvas.height - tileSize) {
            snakePosY = 0;
        }
        if ( snakePosY < 0) {
            snakePosY = canvas.height;
        }

        //GAME OVER
        tail.forEach( snakePart => {
            if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
                gameOver();
            }
        });

        //tail
        tail.push({ x: snakePosX, y: snakePosY });

        //forget earliest parts of snake
        tail = tail.slice(-1 * snakeLength);
        
        //food collision
        if ( snakePosX === foodPosX && snakePosY === foodPosY ) {
            
            title.textContent = ++score;
            snakeLength++;
            resetFood(); 
        }

        
        
    }

    //Draw Snake
    //---------------------------
    function drawSnake() {
        //background
        rectangle('#ffbf00', 0, 0, canvas.width, canvas.height)

        //gird
        drawGrid();

        //food
        rectangle("#00bfff", foodPosX, foodPosY, tileSize, tileSize);

        //tail
        tail.forEach( (snakePart) =>
            rectangle( '#555', snakePart.x, snakePart.y, tileSize, tileSize )
        );

        //snake
        rectangle('black', snakePosX, snakePosY, tileSize, tileSize);

    }

    //randomize food position
    function resetFood() {
        if ( snakeLength === tileCountX * tileCountY) {
            gameOver()
        }

        foodPosX = Math.floor(Math.random() * tileCountX) * tileSize
        foodPosY = Math.floor(Math.random() * tileCountY) * tileSize 

        //food won't spawn on snake's head
        if ( foodPosX === snakePosX && foodPosY === snakePosY ) {
            resetFood()
        }

        if ( 
            tail.some(
                snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY
            ) 
        ){
            resetFood();
        }
    }

    function gameOver() {
        title.innerHTML = ` <strong>GAME OVER<br> Score: ${score}</strong>`;
        gameIsRunning = false;
    }

    // draw rectangle
    function rectangle(color, x, y, width, height) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    //keyboard
    function keyPush(event) {
        switch(event.key) {
            case "ArrowLeft":
                    if (velocityX !== 1) {
                        velocityX = -1;
                        velocityY = 0;
                    }
                    break;
                case "ArrowUp":
                    if (velocityY !== 1) {
                        velocityX = 0;
                        velocityY = -1;
                    }
                    break;
                case "ArrowRight":
                    if (velocityX !== -1) {
                        velocityX = 1;
                        velocityY = 0;
                    }
                    break;
                case "ArrowDown":
                    if (velocityY !== -1) {
                        velocityX = 0;
                        velocityY = 1;
                    }
                
                break;

            default:
                    //restart game
                    if (!gameIsRunning) location.reload();
                break;
        }
    }

    //grid
    function drawGrid () {
        for ( let i = 0; i < tileCountX; i++ ) {
            for (let j = 0; j < tileCountY; j++) {
            rectangle(
                '#fff', 
                tileSize * i,
                tileSize * j, 
                tileSize - 1, 
                tileSize - 1
                );
            }
        }
    }




    //Mobile Controls
    // left key
    function left() {
        if (velocityX !== 1) {
            velocityX = -1;
            velocityY = 0;
        }
        
    }

    // up key
    function up() {
        if (velocityY !== 1) {
            velocityX = 0;
            velocityY = -1;
        }
        
    }

    // right key 
    function right() {
        if (velocityX !== -1) {
            velocityX = 1;
            velocityY = 0;
        }
        
    }
    // down key 
    function down() {
        if (velocityY !== -1) {
            velocityX = 0;
            velocityY = 1;
        }
        
    }


