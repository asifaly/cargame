$(document).ready(function() {

  var direction = {
    0: 'top',
    1: 'left',
  };

  var game = {
    init: function(sprite, container) {
      this.sprite = sprite;
      this.container = container;
      this.isStarted = false;
      this.score = 0;

      $("#score").html('0');
      $(this.container).show("bounce");
      //initialize border, left and top values
      $(this.sprite).css('left', '0px');
      $(this.sprite).css('top', '0px');
      $(this.container).css('border-width', '5px');

      //store the initial values
      this.dimensions.border = parseInt($(this.container).css('border-width'));
      this.dimensions.areaWidth = parseInt($(this.container).css('width'));
      this.dimensions.spriteWidth = parseInt($(this.sprite).css('width'));

      //set initial playArea
      this.setPlayArea();
      // console.log(this.dimensions);
    },

    start: function(sprite, container, begin) {
      this.borderChange();
      $(begin).hide();
      this.init(sprite, container);
      this.isStarted = true;
    },

    move: function(side, rev) {

      if (this.isStarted) {

        //to make reference to the game object in frame function;
        var that = this;
        //to clear the interval and restart on direction change
        this.stop();
        //move the sprite by calling frame function
        this.intervalId = setInterval(frame, 5);
        //get the position of top/left depending on value in side
        var pos = parseInt($(this.sprite).css(direction[side]));


        function frame() {
          //if move Up or towards right then decrement else increment pos
          that.score += 1;
          $("#score").html(that.score);
          rev ? pos-- : pos++;
          //check if pos is left/top is greater than total playarea or less than zero
          //if yes then game over clear the interval id's
          //else continue
          pos > that.dimensions.playArea || pos < 0 ? that.over() : $(that.sprite).css(direction[side], pos + 'px');
          console.log(that.score);
        }

      }

    },

    stop: function() {
      //stop the timer for movement
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },

    over: function() {
      //stop the timer for movement and borderchange
      if (this.borderIntervalId) {
        clearInterval(this.borderIntervalId);
      }
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      $('#gamearea').hide("slow");
      $(begin).html('<span>Game Over! <br> Click to Play Again</span>');
      $(begin).show("slow");
    },

    //measure the dimensions and set the max PlayArea
    setPlayArea: function() {
      this.dimensions.playArea = this.dimensions.areaWidth - this.dimensions.spriteWidth - (this.dimensions.border * 2);
    },

    //function to increase borderwidth every 5 secs so play area becomes smaller
    borderChange: function() {
      this.dimensions.border = parseInt($(this.container).css('border-width'));
      this.borderIntervalId = setInterval(border, 5000);

      function border() {
        game.dimensions.border += 10;
        game.setPlayArea();
        $(game.container).css('border-width', game.dimensions.border + 'px');
      }
    },

    //store the values of dimensions
    dimensions: {
      border: 0,
      areaWidth: 0,
      spriteWidth: 0,
      playArea: 0,
    }
  };

  var car = $('#sprite');
  var gamearea = $("#gamearea");
  var begin = $('#begin');

  $('#begin').click(function() {
    game.start(car, gamearea, begin);
  });

  $('#right').click(function() {
    game.move(1);
  });

  $('#left').click(function() {
    game.move(1, true);
  });

  $('#up').click(function() {
    game.move(0, true);
  });

  $('#down').click(function() {
    game.move(0);
  });

  $('#stop').click(function() {
    game.stop();
  });


  //handle keypress
  $(document).keydown(function(e) {
    switch (e.which) {
      case 37: // left
        game.move(1, true);
        break;

      case 38: // up
        game.move(0, true);
        break;

      case 39: // right
        game.move(1);
        break;

      case 40: // down
        game.move(0);
        break;

      case 32: //space
        game.stop();
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault();
  });

});