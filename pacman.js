let board;
let columnCount = 19;
let rowCount = 21;

//in pixels
let tileSize = 32;
const boardWidth = tileSize * columnCount;
const boardHeight = tileSize * rowCount;
let context;

//images
let blueGhostImage;
let orangeGhostImage;
let redGhostImage;
let pinkGhostImage;

let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;

let wallImage

//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX"
];


const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;


window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    //this tells the board to draw 2d images
    context = board.getContext("2d");
    loadImages()
    loadMap();
    // console.log(
    //     "walls", walls.size,
    //     "foods", foods.size,
    //     "ghosts", ghosts.size,
    //     "pacman", pacman
    // )

    update();
}

const loadImages = () => {
    wallImage = new Image();
    wallImage.src = "/wall.png";

    blueGhostImage = new Image();
    orangeGhostImage = new Image();
    redGhostImage = new Image();
    pinkGhostImage = new Image();

    pacmanUpImage = new Image();
    pacmanDownImage = new Image();
    pacmanLeftImage = new Image();
    pacmanRightImage = new Image();

    blueGhostImage.src = '/blueGhost.png'
    orangeGhostImage.src = '/orangeGhost.png'
    redGhostImage.src = '/redGhost.png'
    pinkGhostImage.src = '/pinkGhost.png'

    pacmanUpImage.src = '/pacmanUp.png'
    pacmanDownImage.src = '/pacmanDown.png'
    pacmanLeftImage.src = '/pacmanLeft.png'
    pacmanRightImage.src = '/pacmanRight.png'
}

const loadMap = () => {
    walls.clear();
    foods.clear();
    ghosts.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            x = c * tileSize;
            y = r * tileSize;

            //X = wall, O = skip, P = pac man, ' ' = food
            //Ghosts: b = blue, o = orange, p = pink, r = red

            if (tileMapChar == "X") {// checks if it's wall
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall)
            }
            if (tileMapChar == "b") {
                const blueGhost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(blueGhost)
            }
            if (tileMapChar == "o") {
                const orangeGhost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(orangeGhost)
            }
            if (tileMapChar == "p") {
                const pinkGhost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(pinkGhost)
            }
            if (tileMapChar == "r") {
                const redGhost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(redGhost)
            }
            if (tileMapChar == "P") {
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            if (tileMapChar == " ") {
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food)
            }
        }
    }
}

const update = () => {
    draw()

    setTimeout(update, 50)
}

const draw = () => {

    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height)
    for (ghost of ghosts.values()) {
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height)
    }
    for (wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height)
    }
}

//class to represent each tile
class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.y = y;
        this.x = x;
        this.height = height;
        this.width = width;

        this.startX = x;
        this.starY = y;
    }
}