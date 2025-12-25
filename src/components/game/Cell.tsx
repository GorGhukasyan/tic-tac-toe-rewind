import { motion } from "framer-motion";

interface CellProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const Cell = ({ value, onClick, isWinning, disabled }: CellProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        relative aspect-square w-full rounded-xl bg-card
        transition-all duration-200 ease-out
        ${!disabled && !value ? "hover:bg-secondary hover:shadow-medium cursor-pointer" : "cursor-default"}
        ${isWinning ? "ring-4 ring-offset-2 ring-offset-background" : "shadow-soft"}
        ${isWinning && value === "X" ? "ring-player-x shadow-glow-x" : ""}
        ${isWinning && value === "O" ? "ring-player-o shadow-glow-o" : ""}
      `}
      whileHover={!disabled && !value ? { scale: 1.02 } : {}}
      whileTap={!disabled && !value ? { scale: 0.98 } : {}}
    >
      {value && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isWinning ? [1, 1.1, 1] : 1, 
            opacity: 1 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            scale: isWinning ? { repeat: Infinity, duration: 1.5 } : {}
          }}
          className={`
            absolute inset-0 flex items-center justify-center
            text-5xl sm:text-6xl md:text-7xl font-bold
            ${value === "X" ? "text-player-x" : "text-player-o"}
          `}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Cell;
