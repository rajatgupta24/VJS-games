const container = document.querySelector(".container");
const restartBtn = document.querySelector(".back-btn");
const scoreText = document.querySelector("#score");


const upBtn = document.querySelector(".up");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

for (let i=0; i<200; i++){
    const square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);
}

const squares = document.querySelectorAll(".square");
let Aliens = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
let shooter = 185;
let score = 0;
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
    if (Aliens.indexOf(shooter) !== -1) {
        return;
    }
    
    for (let i=0; i<squares.length; i++){
        squares[i].classList.remove("alien")
    }

    for (let i=0; i<Aliens.length; i++){
        if (Aliens[Aliens.length-1] > 189) {
            return;
        }
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

const moveShooter = () => {
    if (direction === 1 && shooter === 189 || direction === -1 && shooter === 180) {
        return;
    }
    squares[shooter].classList.remove("player");
    shooter += direction;
    squares[shooter].classList.add("player");
}

const moveLeft = (e) => {
    if (e.key === "ArrowLeft") {
        direction = -1;
    } else if (e.key === "ArrowRight") {
        direction = 1;
    } else {
        return;
    }
    moveShooter();
}

const shoot = (per, e) => {
    let laserId;
    let laserIndex = shooter - width ;
    
    const moveLaser = () => {
        if (laserIndex < 10) {
            squares[laserIndex].classList.remove("laser");
            return;
        }
        squares[laserIndex].classList.remove("laser");
        laserIndex -= width;
        squares[laserIndex].classList.add("laser");
        if (squares[laserIndex].classList.contains("alien")) {
            squares[laserIndex].classList.remove("aliens");
            squares[laserIndex].classList.remove("laser");
            squares[laserIndex].classList.add("boom");
            clearInterval(laserId);
            setTimeout(() => squares[laserIndex].classList.remove("boom"), 50)
            console.log(Aliens.indexOf(laserIndex))
            Aliens = Aliens.filter(Alien => Alien !== Aliens[Aliens.indexOf(laserIndex)])
            score++;
            scoreText.textContent = score;
        }
    }
    
    if (e.keyCode === 32 || per === true ) {
        laserId = setInterval(moveLaser, 100);
    }
}

const restart = () => {
    clearInterval(interval);
    for (let i=0; i<squares.length; i++){
        squares[i].classList.remove("alien");
    }
    squares[shooter].classList.remove("player");
    Aliens = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];    
    shooter = 185;
    score = 0;
    scoreText.textContent = score;
    createAliens();
    setTimeout(makeMove, 1000);
}

restartBtn.addEventListener("click", restart);
document.addEventListener("keydown", shoot);
document.addEventListener("keydown", moveLeft);

rightBtn.addEventListener("click", () => {
    direction = 1;
    moveShooter();
})

leftBtn.addEventListener("click", () => {
    direction = -1;
    moveShooter();
})

upBtn.addEventListener("click", (e) => shoot(true, e));

createAliens();
setTimeout(makeMove, 1000);