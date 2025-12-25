import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Trophy, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameRecord {
  id: string;
  winner: "X" | "O" | "Draw";
  date: string;
}

interface GameHistoryProps {
  history: GameRecord[];
  onClearHistory: () => void;
}

const GameHistory = ({ history, onClearHistory }: GameHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="w-full max-w-[320px] sm:max-w-[380px] mx-auto mt-8">
        <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
          <p className="text-muted-foreground">No games played yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[320px] sm:max-w-[380px] mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Game History</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>
      
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
        <AnimatePresence>
          {history.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`
                flex items-center justify-between p-4 rounded-xl bg-card shadow-soft
                ${game.winner === "X" ? "border-l-4 border-player-x" : ""}
                ${game.winner === "O" ? "border-l-4 border-player-o" : ""}
                ${game.winner === "Draw" ? "border-l-4 border-muted-foreground" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                {game.winner === "Draw" ? (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Minus className="w-5 h-5 text-muted-foreground" />
                  </div>
                ) : (
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${game.winner === "X" ? "bg-player-x/10" : "bg-player-o/10"}
                    `}
                  >
                    <Trophy
                      className={`w-5 h-5 ${
                        game.winner === "X" ? "text-player-x" : "text-player-o"
                      }`}
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">
                    {game.winner === "Draw" ? "Draw" : `${game.winner} Won`}
                  </p>
                  <p className="text-sm text-muted-foreground">{game.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameHistory;
