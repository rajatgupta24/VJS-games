const container = document.querySelector(".container");

for (let i=0; i<200; i++){
    const square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);
}

const squares = document.querySelectorAll(".square");
let Aliens = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
let shooter = 185;
let width = 10;
let direction = 1;
let interval;

const createAliens = () => {
    for (let i=0; i<Aliens.length; i++){
        squares[Aliens[i]].classList.add("alien");
    }
    squares[shooter].classList.add("player");
}

const moveAliens = () => {
    for (let i=0; i<Aliens.length; i++){
        if (Aliens[Aliens.length-1] > 189) {
            return;
        }
        squares[Aliens[i]].classList.remove("alien");
        Aliens[i] += width;
    }
    for (let i=0; i<Aliens.length; i++){
        if (Aliens[Aliens.length] > 199) {
            return;
        }
        squares[Aliens[i]].classList.add("alien");
    }
}

const makeMove = () => {
    interval = setInterval(moveAliens, 500);
}

createAliens();
setTimeout(makeMove, 500);