import { useState, useEffect, useCallback } from "react";

interface GameRecord {
  id: string;
  winner: "X" | "O" | "Draw";
  date: string;
}

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const STORAGE_KEY = "tic-tac-toe-history";

export const useGameLogic = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([]);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameEnded, setGameEnded] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setGameHistory(JSON.parse(saved));
      } catch {
        console.error("Failed to parse game history");
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameHistory));
  }, [gameHistory]);

  const calculateWinner = useCallback((squares: (string | null)[]) => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a] as "X" | "O", line };
      }
    }
    return null;
  }, []);

  const checkDraw = useCallback((squares: (string | null)[]) => {
    return squares.every((square) => square !== null);
  }, []);

  const addGameToHistory = useCallback((winner: "X" | "O" | "Draw") => {
    const newRecord: GameRecord = {
      id: Date.now().toString(),
      winner,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setGameHistory((prev) => [newRecord, ...prev]);
  }, []);

  const handleSquareClick = useCallback(
    (index: number) => {
      if (squares[index] || gameEnded) return;

      const newSquares = [...squares];
      newSquares[index] = isXNext ? "X" : "O";
      setSquares(newSquares);

      const result = calculateWinner(newSquares);
      if (result) {
        setWinningLine(result.line);
        setGameEnded(true);
        addGameToHistory(result.winner);
      } else if (checkDraw(newSquares)) {
        setGameEnded(true);
        addGameToHistory("Draw");
      } else {
        setIsXNext(!isXNext);
      }
    },
    [squares, isXNext, gameEnded, calculateWinner, checkDraw, addGameToHistory]
  );

  const resetGame = useCallback(() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
    setGameEnded(false);
  }, []);

  const clearHistory = useCallback(() => {
    setGameHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const result = calculateWinner(squares);
  const winner = result?.winner ?? (checkDraw(squares) ? "Draw" : null);
  const currentPlayer = isXNext ? "X" : "O";

  return {
    squares,
    currentPlayer,
    winner,
    winningLine,
    gameEnded,
    gameHistory,
    handleSquareClick,
    resetGame,
    clearHistory,
  };
};
