import Cell from "./Cell";

interface BoardProps {
  squares: (string | null)[];
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

const Board = ({ squares, onSquareClick, winningLine, disabled }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-[320px] sm:max-w-[380px] mx-auto">
      {squares.map((value, index) => (
        <Cell
          key={index}
          value={value as "X" | "O" | null}
          onClick={() => onSquareClick(index)}
          isWinning={winningLine?.includes(index) ?? false}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Board;
