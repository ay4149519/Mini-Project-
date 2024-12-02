// main.js

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X'; // Player X starts
let board = ['', '', '', '', '', '', '', '', '']; // Empty board

// Function to handle cell click
function handleClick(event) {
  const cellIndex = event.target.getAttribute('data-cell-index');
  
  // Prevent click if the cell is already filled or if the game is over
  if (board[cellIndex] || checkWinner(board)) return;

  // Fill the cell
  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check for a winner
  if (checkWinner(board)) {
    status.textContent = `${currentPlayer} wins!`;
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check if there's a winner
function checkWinner(board) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Function to restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.pointerEvents = 'auto';
  });
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});
restartBtn.addEventListener('click', restartGame);
