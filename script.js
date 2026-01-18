// SELECT ELEMENTS
const bird = document.getElementById('bird');
const aeroplane = document.getElementById('aeroplane');

let isJumping = false;
let rotation = 0;
let planePosition = -100;

// 2. EVENT LISTENER
window.addEventListener('keydown', () => {
    if (!isJumping) {
        jump();
    }
});


function jump() {
    isJumping = true;
    
    
    bird.style.transition = "bottom 0.5s ease-out";
    bird.style.bottom = "50%"; 

    // SET TIMEOUT
    setTimeout(() => {
        bird.style.transition = "bottom 0.5s ease-in";
        bird.style.bottom = "20%"; 
        
      
        setTimeout(() => { isJumping = false; }, 500);
    }, 500);
}

// 4. SET INTERVAL
const gameLoop = setInterval(() => {
    
    planePosition += 10;
    aeroplane.style.right = planePosition + "px";

    
    if (planePosition > window.innerWidth + 100) {
        planePosition = -100;
    }

   
    if (isJumping) {
        rotation += 7; 
    } else {
        rotation = 0;   
    }
    bird.style.transform = `rotate(${rotation}deg)`;

   
    const birdRect = bird.getBoundingClientRect();
    const planeRect = aeroplane.getBoundingClientRect();

    if (
        planeRect.left < birdRect.right &&
        planeRect.right > birdRect.left &&
        planeRect.top < birdRect.bottom &&
        planeRect.bottom > birdRect.top
    ) {
        handleGameOver();
    }
}, 20);


function handleGameOver() {
    clearInterval(gameLoop);
    alert("Game Over!");
    location.reload();
}