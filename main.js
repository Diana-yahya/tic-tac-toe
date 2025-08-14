let gridItems = document.getElementsByClassName('square');
let currentTurn = 'x';
let gameIsFinished = false;

let reset = document.getElementById("reset-btn");
let resultOverlay = document.getElementById("result-overlay");
let resultMessage = document.getElementById("result-message");
let instruction = document.getElementById("instruction");

let boardArray = [
    '0', '1', '2',
    '3', '4', '5',
    '6', '7', '8'
];

// إعادة التعيين
reset.addEventListener('click', function () {
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].querySelector('.square-content').textContent = '';
        boardArray[i] = i.toString();
    }
    currentTurn = 'x';
    instruction.textContent = "X turn";
    gameIsFinished = false;
    resultOverlay.classList.remove("show");
    document.body.classList.remove("blurred");
});

// عند الضغط على المربعات
for (let item of gridItems) {
    item.addEventListener("click", function () {
        if (gameIsFinished) return;

        let value = item.getAttribute("value");
        let index = value - 1;

        if (boardArray[index] === 'x' || boardArray[index] === 'o') {
            return;
        }

        // وضع الرمز
        boardArray[index] = currentTurn;
        item.querySelector('.square-content').textContent = currentTurn.toUpperCase();

        // تقييم الفوز أو التعادل
        evaluateBoard();

        // تبديل الدور
        if (!gameIsFinished) {
            currentTurn = currentTurn === 'x' ? 'o' : 'x';
            instruction.textContent = `${currentTurn.toUpperCase()} turn`;
        }
    });
}

function evaluateBoard() {
    if (
        (boardArray[0] === boardArray[1] && boardArray[1] === boardArray[2]) ||
        (boardArray[3] === boardArray[4] && boardArray[4] === boardArray[5]) ||
        (boardArray[6] === boardArray[7] && boardArray[7] === boardArray[8]) ||
        (boardArray[0] === boardArray[3] && boardArray[3] === boardArray[6]) ||
        (boardArray[1] === boardArray[4] && boardArray[4] === boardArray[7]) ||
        (boardArray[2] === boardArray[5] && boardArray[5] === boardArray[8]) ||
        (boardArray[0] === boardArray[4] && boardArray[4] === boardArray[8]) ||
        (boardArray[2] === boardArray[4] && boardArray[4] === boardArray[6])
    ) {
        showResult(`${currentTurn.toUpperCase()} WON! 🎉`, "#00ff99");
        return;
    }

    if (boardArray.every(cell => cell === 'x' || cell === 'o')) {
        showResult("It's a draw! 🤝", "#ffcc00");
    }
}

function showResult(message, color) {
    resultMessage.textContent = message;
    resultMessage.style.color = color;
    resultOverlay.classList.add("show");
    document.body.classList.add("blurred");
    gameIsFinished = true;
}