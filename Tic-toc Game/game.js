const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const winnerPopup = document.getElementById("winnerPopup");
const winnerMessage = document.getElementById("winnerMessage");

let currentPlayer = "X";
let gameActive = true;

let gameState = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {

    const clickedCell = event.target;
    const clickedIndex = Number(clickedCell.dataset.index);

    if (
        gameState[clickedIndex] !== "" ||
        !gameActive
    ) {
        return;
    }

    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {

    let roundWon = false;

    for (const condition of winningConditions) {

        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];

        if (
            a === "" ||
            b === "" ||
            c === ""
        ) {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {

        statusText.textContent =
            `🏆 Player ${currentPlayer} Wins!`;

        gameActive = false;

        showWinnerPopup(currentPlayer);

        return;
    }

    if (!gameState.includes("")) {

        statusText.textContent =
            "🤝 It's a Draw!";

        gameActive = false;

        return;
    }

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}

function restartGame() {

    currentPlayer = "X";
    gameActive = true;

    gameState = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    statusText.textContent =
        "Player X's Turn";

    cells.forEach(function (cell) {
        cell.textContent = "";
    });

    closePopup();
}

function showWinnerPopup(player) {

    winnerMessage.innerHTML =
        `Player <strong>${player}</strong> is the Champion!`;

    winnerPopup.style.display = "flex";
}

function closePopup() {

    winnerPopup.style.display = "none";
}

cells.forEach(function (cell) {

    cell.addEventListener(
        "click",
        handleCellClick
    );

});