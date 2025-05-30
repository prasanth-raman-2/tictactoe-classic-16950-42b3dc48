import React, { useState } from "react";
import "./TicTacToeClassic.css";

/**
 * PUBLIC_INTERFACE
 * Main container for TicTacToe Classic. Renders a 3x3 clickable grid, handles turns, win/draw detection, status display, and game reset.
 */
function TicTacToeClassic() {
  // State: 3x3 board array (null | "X" | "O"), current player, game status
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("ongoing"); // "ongoing" | "win" | "draw"
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  // Handles clicking a square: Only if game is ongoing and square empty
  const handleClick = (idx) => {
    if (status !== "ongoing" || board[idx]) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setStatus("win");
      setWinner(win);
      return;
    }
    if (newBoard.every((val) => val)) {
      setStatus("draw");
      setWinner(null);
      return;
    }
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  // Reset the game: clear board and reset state
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus("ongoing");
    setWinner(null);
  };

  // PUBLIC_INTERFACE
  // Renders a single Square
  function Square({ value, onClick }) {
    return (
      <button className="ttt-square" onClick={onClick} aria-label={value ? `Cell: ${value}` : "Empty cell"}>
        {value}
      </button>
    );
  }

  // Status message
  let statusMessage = "";
  if (status === "win") {
    statusMessage = `Winner: ${winner}`;
  } else if (status === "draw") {
    statusMessage = "It's a Draw!";
  } else {
    statusMessage = `Current Turn: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="ttt-classic-wrapper">
      <div className="ttt-classic-title">TicTacToe Classic</div>
      <div className="ttt-status">{status === "ongoing" && (
        <span className="ttt-turn">Current Turn: <span className={xIsNext ? "ttt-x" : "ttt-o"}>{xIsNext ? "X" : "O"}</span></span>
      )}
      {status === "win" && (
        <span className="ttt-win">Winner: <span className={winner === "X" ? "ttt-x" : "ttt-o"}>{winner}</span></span>
      )}
      {status === "draw" && (
        <span className="ttt-draw">It's a Draw!</span>
      )}
      </div>
      <div className="ttt-grid" role="grid">
        {board.map((val, idx) => (
          <Square
            key={idx}
            value={val}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
      <div className="ttt-controls">
        <button className="btn btn-large ttt-reset" onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
// Calculates if there's a winner. Returns "X" or "O" if win, or null.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToeClassic;
