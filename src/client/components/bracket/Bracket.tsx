import { useState, useLayoutEffect, useReducer } from 'react';
import testTournamentData from '../../../assets/test_data/test-tournament';
import RoundColumn from '../RoundColumn';
import toggleView from './reducer';

//typing will have to change once dummy data replaced with real API calls
// eventually pass tournament ID into Bracket
// use it to useQuery and set state

// export interface matchUpRenderObjectTEST {
//   [k: string]: (typeof testTournamentData.matchUps)[];
// }

const initialDisplayState = {
  unidirectional: true,
  numberOfColumns: Math.log2(testTournamentData.matchUps.length + 1),
  displaySettings: {
    gridTemplateColumns: `repeat(${Math.log2(
      testTournamentData.matchUps.length + 1
    )}, 1fr)`,
    columnGap: '10%',
  },
};

const Bracket = () => {
  // combine state updates with useReducer?

  const [displayState, displayDispatch] = useReducer(
    toggleView,
    initialDisplayState
  );

  const [matchUps, setMatchUps] = useState<
    (typeof testTournamentData.matchUps)[]
  >([]);

  // create matchUps object whose keys are round numbers and whose values are the array of matchups for each column
  useLayoutEffect(() => {
    // sorting logic moves to here
    // arrays? destructuring?
    // add column keys in render function
    testTournamentData.matchUps.sort((a, b) => a.matchNumber - b.matchNumber);

    const matchUpData: (typeof testTournamentData.matchUps)[] = [];
    const { unidirectional, numberOfColumns } = displayState;
    if (unidirectional) {
      for (let i = 1; i <= numberOfColumns; i++) {
        const matchUpsFromRound = testTournamentData.matchUps.filter(
          (el) => el.round === i
        );
        matchUpData.push(matchUpsFromRound);
      }
    } else {
      console.log(numberOfColumns);
      for (let i = (numberOfColumns + 1) / 2; i > 0; i--) {
        const matchUpsFromRound = testTournamentData.matchUps.filter(
          (el) => el.round === i
        );
        const mid = matchUpsFromRound.length / 2;
        if (mid === 0.5) {
          matchUpData.push(matchUpsFromRound);
        } else {
          matchUpData.unshift(matchUpsFromRound.slice(0, mid));
          matchUpData.push(matchUpsFromRound.slice(mid));
        }
        console.log(i, matchUpData);
      }
    }
    console.log(matchUpData);
    setMatchUps(matchUpData);
  }, [displayState]);

  return (
    <div>
      <div className='bracket-render-grid' style={displayState.displaySettings}>
        {matchUps.map((column, index) => {
          return <RoundColumn key={index} columnData={column} />;
        })}
      </div>
      <button onClick={() => displayDispatch('toggleView')}>Toggle View</button>
    </div>
  );
};

export default Bracket;
