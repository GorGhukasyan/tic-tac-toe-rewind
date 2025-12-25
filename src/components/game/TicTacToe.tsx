import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Board from "./Board";
import TurnIndicator from "./TurnIndicator";
import GameHistory from "./GameHistory";
import { Button } from "@/components/ui/button";
import { useGameLogic } from "@/hooks/useGameLogic";

const TicTacToe = () => {
  const {
    squares,
    currentPlayer,
    winner,
    winningLine,
    gameEnded,
    gameHistory,
    handleSquareClick,
    resetGame,
    clearHistory,
  } = useGameLogic();

  return (
    <div className="w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
          Tic Tac Toe
        </h1>
        <p className="text-muted-foreground">
          Challenge a friend on the same device
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <TurnIndicator
          currentPlayer={currentPlayer as "X" | "O"}
          winner={winner as "X" | "O" | "Draw" | null}
        />

        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
          disabled={gameEnded}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-6"
        >
          <Button
            onClick={resetGame}
            variant="secondary"
            size="lg"
            className="gap-2 rounded-xl px-6 font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            {gameEnded ? "Play Again" : "Restart"}
          </Button>
        </motion.div>

        <GameHistory history={gameHistory} onClearHistory={clearHistory} />
      </motion.div>
    </div>
  );
};

export default TicTacToe;
