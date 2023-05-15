import { useState, useEffect } from 'react';
import testTournamentData from '../../assets/test_data/test-tournament';

// eventually pass tournament ID into Bracket
// use it to useQuery and set state

// grid-template-areas better?

const Bracket = () => {
  const [numCols, setNumCols] = useState(0);
  const [numRows, setNumRows] = useState(0);
  const [matchUps, setMatchUps] = useState({});
  // get number of rounds
  // use it to set number of rows/cols
  useEffect(() => {
    setNumCols(Math.log2(testTournamentData.matchUps.length + 1));
    setNumRows(Math.ceil(testTournamentData.matchUps.length / 2) * 6);
  }, []);

  // useCallback eventually
  const roundOne = testTournamentData.matchUps.filter((r) => r.round === 1);

  return (
    <div
      className='bracket-render-grid'
      style={{
        gridTemplateColumns: `repeat (${numCols}, 1fr)`,
        gridTemplateRows: `repeat (${numRows}, 1fr)`,
      }}
    >
      {roundOne.map(() => (
        <div className='bracket-test-div'>Here's a div</div>
      ))}
    </div>
  );
};

export default Bracket;
