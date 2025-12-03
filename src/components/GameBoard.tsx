type GameBoardPropsType = {
  board: Array<Array<string | null>>;
  // player: string;
  handleCellClick: (row: number, col: number) => void;
};

const GameBoard = ({ board, handleCellClick }: GameBoardPropsType) => {
  return (
    <div className="game-container">
      {board.map((row, rowIdx) => (
        <div className="game-row" key={rowIdx}>
          {row.map((col, colIdx) => (
            <button
              className={`game-cell-btn ${col ? `player-${col.toLowerCase()}` : ''} `}
              key={colIdx}
              onClick={() => handleCellClick(rowIdx, colIdx)}
            >{col}</button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
