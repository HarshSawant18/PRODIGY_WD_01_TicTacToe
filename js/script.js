document.getElementById('startGame').addEventListener('click', function () {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    if (!player1 || !player2) {
        alert('Please enter both player names.');
        return;
    }

    document.getElementById('gameBoard').classList.remove('hidden');
    document.getElementById('winnerMessage').classList.add('hidden');
    startGame(player1, player2);
});

function startGame(player1, player2) {
    let currentPlayer = player1;
    const gameBoard = document.getElementById('gameBoard');
    const winnerMessage = document.getElementById('winnerMessage');
    gameBoard.innerHTML = ''; // Clear any existing game cells
    winnerMessage.innerHTML = ''; // Clear any existing winner message

    const board = Array(9).fill(null);

    function checkWinner(board) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                drawLine(combination);
                return board[a];
            }
        }
        return null;
    }

    function handleClick(index) {
        if (board[index] || checkWinner(board)) {
            return;
        }

        board[index] = currentPlayer === player1 ? 'X' : 'O';
        this.textContent = board[index];

        const winner = checkWinner(board);
        if (winner) {
            winnerMessage.textContent = `${winner === 'X' ? player1 : player2} wins!`;
            winnerMessage.classList.remove('hidden');
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    function drawLine(combination) {
        const cells = gameBoard.children;
        const [a, b, c] = combination;
        const line = document.createElement('div');
        line.classList.add('line');

        const rectA = cells[a].getBoundingClientRect();
        const rectC = cells[c].getBoundingClientRect();
        const containerRect = gameBoard.getBoundingClientRect();

        const startX = rectA.left + rectA.width / 2 - containerRect.left;
        const startY = rectA.top + rectA.height / 2 - containerRect.top;
        const endX = rectC.left + rectC.width / 2 - containerRect.left;
        const endY = rectC.top + rectC.height / 2 - containerRect.top;

        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

        line.style.width = length + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = startX + 'px';
        line.style.top = startY + 'px';

        gameBoard.appendChild(line);
    }

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', handleClick.bind(cell, i));
        gameBoard.appendChild(cell);
    }
}