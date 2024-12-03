const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 1;

function makeBoard() {
    let boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < cols; c++) {
            board[r][c] = 0;
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.onclick = () => drop(c);
            boardEl.appendChild(cell);
        }
    }
}

function drop(col) {
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            let cell = document.querySelector(`.cell[data-row="${r}"][data-col="${col}"]`);
            let disc = document.createElement('div');
            disc.className = `disc player${currentPlayer}`;
            cell.appendChild(disc);
            requestAnimationFrame(() => disc.style.top = '0px');
            if (checkWin(r, col)) showWinner(currentPlayer);
            else currentPlayer = currentPlayer === 1 ? 2 : 1;
            return;
        }
    }
}

function showWinner(player) {
    let banner = document.getElementById('winner-banner');
    banner.textContent = player === 1 ? 'Orange Flame Wins!' : 'White Flame Wins!';
    banner.style.background = player === 1 ? '#ff0000' : '#ffd700';
    banner.classList.add('active');
    document.querySelectorAll('.cell').forEach(cell => cell.onclick = null);
}

function checkWin(r, c) {
    let dirs = [
        { dr: -1, dc: 0 }, // up
        { dr: 0, dc: 1 },  // right
        { dr: -1, dc: 1 }, // diagonal /
        { dr: -1, dc: -1 } // diagonal \
    ];
    for (let dir of dirs) {
        let count = 1 + countDir(r, c, dir.dr, dir.dc) + countDir(r, c, -dir.dr, -dir.dc);
        if (count >= 4) return true;
    }
    return false;
}

function countDir(r, c, dr, dc) {
    let cnt = 0, rr = r + dr, cc = c + dc;
    while (rr >= 0 && rr < rows && cc >= 0 && cc < cols && board[rr][cc] === currentPlayer) {
        cnt++;
        rr += dr;
        cc += dc;
    }
    return cnt;
}

makeBoard();
