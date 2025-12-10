type GameBoardPropsType = {
  board: Array<Array<string | null>>;
  winner: string | null;
  handleCellClick: (row: number, col: number) => void;
};


const GameBoard = ({ board, handleCellClick, winner }: GameBoardPropsType) => {

const gameoverContent = <div className={`gameover-message ${winner?.toLowerCase()}`}>{winner === 'X' ? 'WIN' : 'LOSE' }</div>

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
      {winner && gameoverContent}
    </div>
  );
};

export default GameBoard;
