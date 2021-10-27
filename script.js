let pageHeight = window.innerHeight*.8;
let pageWidth = window.innerWidth*.9;
let imgWidth = 50;
let minPosition = 5;
const maxPosition = {
    if(pageWidth === 0 || pageWidth === undefined){
        return 350;
    } else return pageWidth -imgWidth - 5;
}
const pacArray = [
    ['./assets/PacMan1.png', './assets/PacMan2.png'],
    ['./assets/PacMan3.png', './assets/PacMan4.png']
];

const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: (Math.random() * scale) + minPosition,
        y: (Math.random() * scale*0.9) - minPosition 
    }
}
// Factory to make a PacMan at a random position with random velocity
function pacManFactory() {
    // returns an object with random values scaled
    let velocity = setToRandom(10);
    let position = setToRandom(minPosition);
    let direction = 0;
    let focus = 0;
    // Add image to div id = game
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = './assets/PacMan1.png';
    newimg.width = imgWidth;
    newimg.height = imgWidth;
    newimg.style.left = position.x;
    newimg.style.top = position.y;
    // add new pacman image to game
    let game = document.getElementById('game');
    game.appendChild(newimg);
    // return details in an object
    return {
        velocity,
        position,
        direction,
        focus,
        newimg
    }
}

function update() {
    //used to update direction, image, and position for each pacman object in the arrays
    pacMen.forEach((item) => {
        item.focus = checkFocus(item.focus);
        item.direction = checkPageBounds(item.direction, item.position, pageWidth);
        item.newimg.src = pacArray[item.direction][item.focus];
        if (item.direction) {
            item.position.x -= 20;
            item.newimg.style.left = item.position.x + "px";
        } else {
            item.position.x += 20;
            item.newimg.style.left = item.position.x + 'px';
        }

    })
    setTimeout(update, 100);
}

function checkFocus(focus) {
    if(focus)
    {
        focus = 0;
    } 
    else
    {
        focus = 1;
    }
    return focus;

}
function checkPageBounds(direction,position, pageWidth) {
    if(position.x <= minPosition)
    {
        direction = 0;
    } 
    else if(position.x  >= maxPosition)
    {
        direction = 1;
    }
    else direction = direction;

    return direction;
}

function makeOne() {
    // add a new PacMan to arrays
    pacMen.push(pacManFactory()); 
}
