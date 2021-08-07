let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let direcion = 'right';

let snake = [];
snake[0] = {x: 16 * box, y: 16 * box}

let food = {x: Math.floor(Math.random() * 2 + 1) * box, y: Math.floor(Math.random() * 2 + 1) * box}

function criarBackGround(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 512, 512);
}

function criarSnake(){
    for (let s of snake) {
        context.fillStyle = 'green';
        context.fillRect(s.x, s.y, box, box);
    }
}

function drawFood(){
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(e){
    if(e.code == 'ArrowLeft' && direcion != 'right') direcion = 'left';
    if(e.code == 'ArrowUp' && direcion != 'down') direcion = 'up';
    if(e.code == 'ArrowRight' && direcion != 'left') direcion = 'right';
    if(e.code == 'ArrowDown'  && direcion != 'up') direcion = 'down';    
}

function StartGamer(){
    if((snake[0].x > (10 * box)) && (direcion == 'right')) snake[0].x = 0;
    if(snake[0].x < 0 && direcion == 'left') snake[0].x = (11 * box);
    if((snake[0].y > (10 * box)) && (direcion == 'down')) snake[0].y = 0;
    if(snake[0].y < 0 && direcion == 'up') snake[0].y = (11 * box);

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(gamer);
            alert('Gamer Over (:');
        }
    }

    criarBackGround();
    criarSnake();
    drawFood();

    let snakerX = snake[0].x;
    let snakerY = snake[0].y;

    if (direcion == 'right') snakerX += box;
    if (direcion == 'left') snakerX -= box;
    if (direcion == 'up') snakerY -= box;    
    if (direcion == 'down') snakerY += box;

    if(snakerX != food.x || snakerY != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 3 + 1) * box;
        food.y = Math.floor(Math.random() * 3 + 1) * box;
    }

    let newHead = {x: snakerX, y: snakerY}

    snake.unshift(newHead);
}

let gamer = setInterval(StartGamer, 100);