import { motion } from "framer-motion";

interface TurnIndicatorProps {
  currentPlayer: "X" | "O";
  winner: "X" | "O" | "Draw" | null;
}

const TurnIndicator = ({ currentPlayer, winner }: TurnIndicatorProps) => {
  if (winner) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-6"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`
            inline-flex items-center gap-3 px-6 py-3 rounded-2xl
            ${winner === "Draw" ? "bg-muted" : winner === "X" ? "bg-player-x/10" : "bg-player-o/10"}
          `}
        >
          {winner === "Draw" ? (
            <span className="text-xl font-semibold text-muted-foreground">
              It's a Draw!
            </span>
          ) : (
            <>
              <span
                className={`text-3xl font-bold ${
                  winner === "X" ? "text-player-x" : "text-player-o"
                }`}
              >
                {winner}
              </span>
              <span className="text-xl font-semibold text-foreground">
                Wins! 🎉
              </span>
            </>
          )}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-secondary">
        <span className="text-muted-foreground font-medium">Current turn:</span>
        <motion.span
          key={currentPlayer}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-3xl font-bold ${
            currentPlayer === "X" ? "text-player-x" : "text-player-o"
          }`}
        >
          {currentPlayer}
        </motion.span>
      </div>
    </div>
  );
};

export default TurnIndicator;
