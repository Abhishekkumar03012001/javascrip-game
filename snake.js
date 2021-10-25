
(function() {
    var SIZE = 500; 
    var GRID_SIZE = SIZE / 50;
    var c = document.getElementById('c');
    c.height = c.width = SIZE * 2; 
    c.style.width = c.style.height = SIZE + 'px';
    var context = c.getContext('2d');
    context.scale(2, 2); 
  
    var direction = newDirection = 1; 
    var snakeLength = 5;
    var snake = [{x: SIZE / 2, y: SIZE / 2}]; 
    var candy = null;
    var end = false;
  
    function randomOffset() {
      return Math.floor(Math.random() * SIZE / GRID_SIZE) * GRID_SIZE;
    }
  
    function stringifyCoord(obj) {
      return [obj.x, obj.y].join(',');
    }
  
    function tick() {
      var newHead = {x: snake[0].x, y: snake[0].y};
  

      if (Math.abs(direction) !== Math.abs(newDirection)) {
        direction = newDirection;
      }
      var axis = Math.abs(direction) === 1 ? 'x' : 'y'; 
      if (direction < 0) {
        newHead[axis] -= GRID_SIZE; 
      } else {
        newHead[axis] += GRID_SIZE; 
      }
  

      if (candy && candy.x === newHead.x && candy.y === newHead.y) {
        candy = null;
        snakeLength += 20;
      }
  
      context.fillStyle = '#002b36';
      context.fillRect(0, 0, SIZE, SIZE); 
      if (end) {
        context.fillStyle = '#eee8d5';
        context.font = '40px serif';
        context.textAlign = 'center';
        context.fillText('Refresh to play again', SIZE / 2, SIZE / 2);
      } else {
        snake.unshift(newHead); 
        snake = snake.slice(0, snakeLength); 
      }
  
      if (newHead.x < 0 || newHead.x >= SIZE || newHead.y < 0 || newHead.y >= SIZE) {
        end = true;
      }
  
      context.fillStyle = '#278bd2';
      var snakeObj = {};
      for (var i = 0; i < snake.length; i++) {
        var a = snake[i];
        context.fillRect(a.x, a.y, GRID_SIZE, GRID_SIZE); 
        if (i > 0) snakeObj[stringifyCoord(a)] = true;
      }
  
      if (snakeObj[stringifyCoord(newHead)]) end = true; 
  
      while (!candy || snakeObj[stringifyCoord(candy)]) {
        candy = {x: randomOffset(), y: randomOffset()};
      }
  
      context.fillStyle = '#b58900';
      context.fillRect(candy.x, candy.y, GRID_SIZE, GRID_SIZE); 
    }
  
    window.onload = function() {
      setInterval(tick, 100); 
      window.onkeydown = function(e) {
        newDirection = {37: -1, 38: -2, 39: 1, 40: 2}[e.keyCode] || newDirection;
      };
    };
  })();