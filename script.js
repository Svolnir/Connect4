// Grabbing elements from the html doc.
// First player to move when the screen opens
var currentPlayer = 1;
const resetBtn = document.getElementById("resetBtn");
const undoBtn = document.getElementById("undoBtn");
// creates an array of board columns grabbed from html doc
const boardCols = [...document.getElementsByClassName("boardCol")];
/* function empties old spaces from each column, sets six empty spaces as children
for each board column as children in html doc, and returns those spaces as a 
2D array for easy access throughout script. */
const setSpaces = () => {
    const array = [];
    boardCols.forEach(el => {    
        el.innerText = "";
        for (let i = 0; i < 6; i++) {
            //todo: Spaces might not need their own IDs.
            //Test that when placing pieces works.         ↓
            el.innerHTML += `<div class="space empty" id="space${el.id[8]}-${i}"></div>`;
        };
        array.push([...el.children]);
    });
    return array;

};
// Create empty spaces array and assign them to array "boardSpaces".
var boardSpaces = setSpaces();

const switchPlayer = () => {
    currentPlayer === 1? currentPlayer = 2 : currentPlayer = 1;
};
/* The following 2D array is an empty board rotated 90 degrees clockwise.
The left side of this array is the bottom of the game board in the interface.*/
var gameState = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
];
// this moveslist makes the undo button work right
var movesList = [];


// Self explanatory:
const resetBoard = () => {
    boardSpaces = setSpaces();
    currentPlayer = 1;
    gameState = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];
    movesList = [];
};

const check = (a, b) => {
    //vertical check:
    const vertLine = [];
    let x = a;
    let y = b;
    while (gameState[x][y] === currentPlayer) {
        vertLine.push(boardSpaces[x][y]);
        y++;
    };
    y = b - 1;
    while (gameState[x][y] === currentPlayer) {
        vertLine.push(boardSpaces[x][y]);
        y--;
    };
    if (vertLine.length > 3) {
        vertLine.forEach(el => el.classList.add('winning'));
    };
    
    //horizontal check:
    const horzLine = [];
    x = a;
    y = b;
    while (gameState[x][y] === currentPlayer) {
        horzLine.push(boardSpaces[x][y]);
        x++;
        if (x > 6) break;
    };
    if (a > 0) {
        x = a - 1;
        while (gameState[x][y] === currentPlayer) {
            horzLine.push(boardSpaces[x][y]);
        x--;
        if (x < 0) break;
        };
    };
    if (horzLine.length > 3) {
        horzLine.forEach(el => el.classList.add('winning'));
    };

    //incline check:
    const incLine = [];
    x = a;
    y = b;
    while (gameState[x][y] === currentPlayer) {
        incLine.push(boardSpaces[x][y]);
        x++;
        y++;
        if (x > 6) break;
    };
    if (a > 0) {
        x = a - 1;
        y = b - 1;
        while (gameState[x][y] === currentPlayer) {
            incLine.push(boardSpaces[x][y]);
        x--;
        y--;
        if (x < 0) break;
        };
    };
    if (incLine.length > 3) {
        incLine.forEach(el => el.classList.add('winning'));
    };

    //decline check:
    const decLine = [];
    x = a;
    y = b;
    while (gameState[x][y] === currentPlayer) {
        decLine.push(boardSpaces[x][y]);
        x++;
        y--;
        if (x > 6) break;
    };
    if (a > 0) {
        x = a - 1;
        y = b + 1;
        while (gameState[x][y] === currentPlayer) {
            decLine.push(boardSpaces[x][y]);
        x--;
        y++;
        if (x < 0) break;
        };
    };
    if (decLine.length > 3) {
        decLine.forEach(el => el.classList.add('winning'));
    };
};

const addPiece = (colNum) => {
    const MoveY = gameState[colNum].length;
    if (MoveY < 6) {
        movesList.push(colNum);
        boardSpaces[colNum][MoveY].classList.remove("empty");
        boardSpaces[colNum][MoveY].classList.add(`p${currentPlayer}`);
        gameState[colNum].push(currentPlayer);
        check(colNum, MoveY);
        switchPlayer();
    };
};

const undoLastMove = () => {
    movesList.pop();
    let undoneMovesList = movesList;
    movesList = [];
    boardSpaces = setSpaces();
    currentPlayer = 1;
    gameState = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];
    undoneMovesList.forEach((i) => addPiece(i));

};

resetBtn.addEventListener('click', resetBoard);
undoBtn.addEventListener('click', undoLastMove);

/* To-Do:

- Style the buttons to not be terrible.
- Add a div to the interface that diplays whose turn it is.
Have this div move to where there's more negative space on the page.
- Take a break from this project and come back a few weeks later to admire 
how impressively stupid your code once was after you've learned a little more.
- Make it work with a lobby system and separate device for each player.*/


/* Stuff I finished:

- Add click event listeners to each column that properly occupy spaces on the board.
- Fix the undo function; if the winning move is undone, so should the victory styling
(on only the invalidated victory).
- Deploy into the wild. 
- Check algorithm: starting at the space where the last piece was placed,
move out in opposite directions creating an array of space coordinates occupied by 
the same player. when done, if the list is 4 or longer, emphasize those spaces 
with style and class. Repeat for the other three directions 4 in a line can be made.

*/