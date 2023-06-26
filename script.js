const height = 30;
const width = 30;
const snake = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let head = snake[0];
let direction = "left";
let interval;
let random;
let gameStatus = "ready";
const board = document.querySelector('.board');

board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;


const confines = {
    right: [],
    left: [],
    top: [],
    down: [],
}

//left confines array
for (let i = 1; i <= height; i++) {
    confines.left.push(width * i + 1);
}

//right confines array
for (let i = 0; i < height; i++) {
    confines.right.push(width * i - 1);
}





//functions//////////////////////////////

window.onload = () => {

    console.log("page ready");
    document.querySelector('h3').innerHTML = `score: ${snake.length} | status: ${gameStatus}`
    createBoard();
}


function createBoard() {
    for (let i = 0; i < height * width; i++) {
        const div = document.createElement('div');
        // div.innerHTML = i + 1;
        board.appendChild(div);
    }
    color();
    setApple();
}

function color() {
    const divs = document.querySelectorAll(".board div");
    divs.forEach(element => {
        element.classList.remove("active");
        element.classList.remove("up");
        element.classList.remove("left");
        element.classList.remove("right");
        element.classList.remove("down");
        element.classList.remove("head");


    });

    snake.forEach(index => divs[index].classList.add("active"));
    divs[head].classList.add("head");
    divs[head].classList.add(direction);
}




function move(dir) {
    const divs = document.querySelectorAll(".board div");

    //---UP---
    if (dir === 'up') {
        head -= width;
        if (!divs[head]) {
            gameOver();
        }

        //---DOWN---
    } else if (dir === 'down') {
        head += width;

        if (!divs[head]) {
            gameOver();
        }

        //---LEFT---
    } else if (dir === 'left') {
        head++;

        if (confines.left.includes(head + 1)) {
            gameOver();
        }

        //---RIGHT---
    } else if (dir === 'right') {
        head--;
        if (confines.right.includes(head)) {
            gameOver();

        }
    }


    if (snake.includes(head)) {
        gameOver();
    }

    if (head !== (random)) {
        snake.pop();
    }
    if (head == (random)) {
        setApple();
    }

    console.log(head);
    snake.unshift(head);
    direction = dir;
    color();
    startAuto();
    document.querySelector('h3').innerHTML = `score: ${snake.length*10}  status: ${gameStatus}`

}




function setApple() {
    const divs = document.querySelectorAll(".board div");
    random = Math.floor(Math.random() * divs.length);
    if (snake.includes(random)) {
        setApple();
    } else {
        divs.forEach(elem => elem.classList.remove("apple"));
        divs[random].classList.add('apple');

    }

}

function playSound(src) {
    let audio = new Audio(src);
    audio.play();
}

function gameOver() {
    clearInterval(interval);
    playSound("gameOver.mp3");
    let feedback = confirm("GAME IS OVER");
    if (feedback === true) {
        location.reload();
    }
    return;
}

function startAuto() {
    clearInterval(interval);
    gameStatus = "play";
    interval = setInterval(() => {
        move(direction)
    }, 100);
}



window.addEventListener("keydown", ev => {
    ev.preventDefault;

    //console.log(ev.key); 

    switch (ev.key) {
        case 'ArrowLeft':
            if (direction != 'right') {
                move('left');
                break;
            };
            break;

        case 'ArrowRight':
            if (direction != 'left') {
                move('right');
                break;
            };
            break;

        case 'ArrowUp':
            if (direction != 'down') {
                move('up');
                break;
            }
            break;

        case 'ArrowDown':
            if (direction != 'up') {
                move('down');
                break;
            }
            break;

        case ' ':
            clearInterval(interval);
            gameStatus = "stop";
            document.querySelector('h3').innerHTML = `score: ${snake.length*10}  status: ${gameStatus}`
            break;
    }

});