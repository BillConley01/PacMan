const gameFrame = document.getElementById("game");


let imgWidth = 50;

const pacArray = [
    ['./assets/PacMan1.png', './assets/PacMan2.png'],
    ['./assets/PacMan3.png', './assets/PacMan4.png']
];

const pacMen = []; // This array holds all the pacmen

function setBoundaries()
{
    const box = gameFrame.getBoundingClientRect();
    console.log(box.width);
    return {
        min: 10,
        x: box.width - imgWidth - 10,
        y: box.height - imgWidth - 10,
    }
}

function setToRandom(scale) {
    return {
        x: (Math.random() * scale.x) + scale.min,
        y: (Math.random() * scale.y) - scale.min 
    }
}

// Factory to make a PacMan at a random position with random velocity
function pacManFactory() {
    // returns an object with random values scaled
    let scale = setBoundaries();
    let velocity = setToRandom(10);
    let position = setToRandom(scale);
    let direction = 0;
    let focus = 0;
    // Add image to div id = game
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = './assets/PacMan1.png';
    newimg.width = imgWidth;
    newimg.height = imgWidth;
    newimg.style.left = position.x + "px";
    newimg.style.top = position.y + "px";
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
        item.direction = checkPageBounds(item.direction, item.position);
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
function checkPageBounds(direction,position) {
    let minPosition = setBoundaries().min;
    let maxPositionX = setBoundaries().x;
    if(position.x <= minPosition)
    {
        direction = 0;
    } 
    else if(position.x  >= maxPositionX)
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
