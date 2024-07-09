// Initializing variables that are the actual game.
// First player to move when the screen opens
var currentPlayer = 1;
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
const movesList = [];
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

// Create empty spaces immediately and assign them to .
var boardSpaces = setSpaces();

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
};

const addPiece = (colNum) => {
    if (gameState[colNum].length < 6) {
        const move = [colNum, gameState[colNum].length, currentPlayer];
        movesList.push(move);
        gameState[colNum][move[1]] = currentPlayer;
        boardSpaces[move[0]][move[1]].classList.remove("empty");
        boardSpaces[move[0]][move[1]].classList.add(`p${currentPlayer}`);
        switchPlayer();
    };
};

const undoLastMove = () => {
    const lastMove = movesList.pop();
    gameState[lastMove[0]].pop();
    boardSpaces[lastMove[0]][lastMove[1]].classList.remove("p1");
    boardSpaces[lastMove[0]][lastMove[1]].classList.remove("p2");
    boardSpaces[lastMove[0]][lastMove[1]].classList.add("empty");
    switchPlayer();
};

const resetBtn = document.getElementById("resetBtn");
const undoBtn = document.getElementById("undoBtn");

resetBtn.addEventListener('click', resetBoard);
undoBtn.addEventListener('click', undoLastMove);

/* To-Do:

- Add click event listeners to each column that properly occupy spaces on the board.

- Make the undo button work right. Style the buttons to not be terrible.

- Clean up and deploy into the wild. 

- Add a div to the interface that diplays whose turn it is.
Have this div move to where there's more negative space on the page.

- Check algorithm: starting at the space where the last piece was placed,
move out in opposite directions creating an array of space coordinates occupied by 
the same player. when done, if the list is 4 or longer, emphasize those spaces 
with style and class. Repeat for the other three directions 4 in a line can be made.
If at least one array of length > 3 is made, then declare winner and disable addition
of pieces to the board until reset button is clicked and board is reset.



- Take a break from this project and come back a few weeks later to admire 
how impressively stupid your code once was after you've learned a little more.

- Make it work with a lobby system and separate device for each player.*/