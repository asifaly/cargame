$(document).ready(function() {

  var direction = {
    0: 'top',
    1: 'left',
  };

  var game = {
    init: function(sprite) {
      this.sprite = sprite;
      $(this.sprite).css('left', '0px');
      $(this.sprite).css('top', '0px');

    },

    move: function(side, rev) {

      this.stop();

      this.intervalId = setInterval(frame, 5);
      var pos = parseInt($(this.sprite).css(direction[side]));
      var sprite = this.sprite;

      function frame() {
        rev ? pos-- : pos++;
        pos > 475 || pos < 0 ? game.stop() : $(sprite).css(direction[side], pos + 'px');
        console.log(pos);
      }

    },

    stop: function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },

  };

  var car = $('#sprite');
  game.init(car);

  $('#start').click(function() {
    game.move(1);
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