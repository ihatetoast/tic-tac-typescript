import { useState } from 'react';
import GameBoard from './components/GameBoard';

type GridArrayType = Array<Array<string | null>>;

const INITIAL_GAME_GRID = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


const computerSimulatedClick = (
  gameBoard: GridArrayType
): [number, number] => {
  // collect empty cells
  const possibleOptions: [number, number][] = [];

  gameBoard.forEach((row, rowIdx) => {
    row.forEach((cell, cellIdx) => {
      if (!cell) {
        possibleOptions.push([rowIdx, cellIdx]);
      }
    });
  });
  // rando index to pick
  const randomIndex = Math.floor(Math.random() * possibleOptions.length);
  return possibleOptions[randomIndex];
};


const checkForWinner = (gbd: GridArrayType): string | null => {
    // hardcode combo: 3 rows, 3 cols, two diags
    // fill in the combinations with the vals of the grid passed in
    const combinations = [
      [gbd[0][0], gbd[0][1], gbd[0][2]],
      [gbd[1][0], gbd[1][1], gbd[1][2]],
      [gbd[2][0], gbd[2][1], gbd[2][2]],

      [gbd[0][0], gbd[1][0], gbd[2][0]],
      [gbd[0][1], gbd[1][1], gbd[2][1]],
      [gbd[0][2], gbd[1][2], gbd[2][2]],

      [gbd[0][0], gbd[1][1], gbd[2][2]],
      [gbd[0][2], gbd[1][1], gbd[2][0]],
    ];

    for (const combo of combinations) {
      if (combo[0] && combo[0] === combo[1] && combo[0] === combo[2]) {
        return combo[0];
      }
    }
    return null;
  };

// TODO maybe later. much later. Would I have a check pairs similar to check winner
// where I see if (in the combos) 2/3 being equal, then choose the third if it's empty.

function App() {

  const [gameGrid, setGameGrid] = useState<GridArrayType>(INITIAL_GAME_GRID);
  const [winner, setWinner] = useState<string | null>(null);
  const [isTie, setIsTie] = useState<boolean>(false);

  const handleCellClick = (playedRow: number, playedCol: number) => {
    // if there's already a winner or if cell occupied with O or X
    if (winner || gameGrid[playedRow][playedCol]) {
      return;
    }

    // HUMAN:
    const updatedGridHuman = gameGrid.map((row, rowIdx) =>
        row.map((cell, cellIdx) =>
          rowIdx === playedRow && cellIdx === playedCol ? 'X' : cell
        )
      );

    // ttt is simple enough we can just update. prevState isn't nec as no one is that rapid
    setGameGrid(updatedGridHuman);

    const humanWinner = checkForWinner(updatedGridHuman);
    if(humanWinner) {
      setWinner(humanWinner);
      return; // game over; human wins
    }

    // game board is full (game can be full only after the player makes a move. 9th square when 2 play will be first player's turn -- human)
    const isBoardFull = updatedGridHuman.every(row => row.every(cell=> cell !== null));
    if(isBoardFull && !winner) {
      setIsTie(true);
      return; // game over; tie--no winner
    }

    // computer's turn
    // get the pair of row/col for a random empty cell, using human's 
      const [compRow, compCol] = computerSimulatedClick(updatedGridHuman);

      const updatedGridComp = updatedGridHuman.map((row, rowIdx) =>
      row.map((cell, cellIdx) =>
        rowIdx === compRow && cellIdx === compCol
          ? 'O'
          : cell
      ));

      // artificial delay to make the computer less ... jarring
      setTimeout(() => {
        setGameGrid(updatedGridComp);
        const compWinner = checkForWinner(updatedGridComp);
          setWinner(compWinner);
      }, 200);
    
  };

  const restartGame = (): void => {
    setGameGrid(INITIAL_GAME_GRID);
    setWinner(null);
    setIsTie(false);
  };
  const button = <button className="reset-btn" onClick={restartGame}>Play again!</button>;

  return (
    <div className="container">
      <GameBoard board={gameGrid} handleCellClick={handleCellClick} winner={winner}/>
      {isTie &&  <div className="message-container"><p className="message">It's a tie!</p>{button}</div>}
      {winner && <div className="message-container"><p className={`message player-${winner.toLowerCase()}`}>{winner === 'X' ? 'Humanoid wins.' : 'The computer, which only chose at random, beat you.'}</p>
      {button}
      </div>}
    </div>
  );
}

export default App;

