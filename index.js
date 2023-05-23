const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const previousBtn = document.querySelector("#previousBtn");
const nextBtn = document.querySelector("#nextBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let moveHistory = [];
let currentMoveIndex = -1;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    previousBtn.addEventListener("click", showPreviousMove);
    nextBtn.addEventListener("click", showNextMove);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    resetMoveHistory();
    updateMoveHistory();
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    updateMoveHistory();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ""));
    running = true;
    resetMoveHistory();
    updateMoveHistory();
}

function resetMoveHistory() {
    moveHistory = [];
    currentMoveIndex = -1;
    previousBtn.disabled = true;
    nextBtn.disabled = true;
}

function updateMoveHistory() {
    const move = [...options];
    moveHistory.push(move);
    currentMoveIndex = moveHistory.length - 1;

    if (moveHistory.length > 1) {
        previousBtn.disabled = false;
    }

    if (currentMoveIndex < moveHistory.length - 1) {
        nextBtn.disabled = false;
    }
}

function showPreviousMove() {
    if (currentMoveIndex > 0) {
        currentMoveIndex--;
        const previousMove = moveHistory[currentMoveIndex];
        updateBoard(previousMove);
    }

    if (currentMoveIndex === 0) {
        previousBtn.disabled = true;
    }

    nextBtn.disabled = false;
}

function showNextMove() {
    if (currentMoveIndex < moveHistory.length - 1) {
        currentMoveIndex++;
        const nextMove = moveHistory[currentMoveIndex];
        updateBoard(nextMove);
    }

    if (currentMoveIndex === moveHistory.length - 1) {
        nextBtn.disabled = true;
    }

    previousBtn.disabled = false;
}

function updateBoard(move) {
    options = move;
    cells.forEach((cell, index) => {
        cell.textContent = move[index];
    });
}

restartGame();

