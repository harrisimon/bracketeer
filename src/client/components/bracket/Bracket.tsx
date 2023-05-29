import { useState, useEffect, useReducer } from 'react';
import testTournamentData from '../../../assets/test_data/test-tournament';
import RoundColumn from '../RoundColumn';
import toggleView from './reducer';

//typing will have to change once dummy data replaced with real API calls
// eventually pass tournament ID into Bracket
// use it to useQuery and set state

export interface matchUpRenderObjectTEST {
  [k: string]: (typeof testTournamentData.matchUps)[];
}

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

  const [matchUps, setMatchUps] = useState<matchUpRenderObjectTEST>({});

  // create matchUps object whose keys are round numbers and whose values are the array of matchups for each column
  useEffect(() => {
    const matchUpData: matchUpRenderObjectTEST = {};
    const { unidirectional, numberOfColumns } = displayState;
    if (unidirectional) {
      for (let i = 1; i <= numberOfColumns; i++) {
        const key = 'round' + i.toString();
        matchUpData[key] = [];
        const matchUpsFromRound = testTournamentData.matchUps.filter(
          (el) => el.round === i
        );
        matchUpsFromRound.forEach((el) => matchUpData[key].push(el));
      }
    } else {
      // store new number of columns in block-scoped variable for use in for loop. We can't rely on state being updated immediately
      for (let i = 1; i < numberOfColumns; i++) {
        console.log(displayState);
        console.log(matchUps);

        const matchUpsFromRound = testTournamentData.matchUps.filter(
          (el) => el.round === i
        );

        // Math.ceil accounts for last iterations, when matchUpsFromRound has a length of 1
        // possible there's a better way to short-circuit on the last iteration
        const middleIndex = Math.ceil(matchUpsFromRound.length / 2);
        const left = matchUpsFromRound.slice(0, middleIndex);
        const right = matchUpsFromRound.slice(middleIndex);

        if (left.length) {
          let key = `lRound${i.toString()}`;
          matchUpData[key] = [];
          left.forEach((el) => matchUpData[key].push(el));
        }
        if (right.length) {
          let key = `rRound${i.toString()}`;
          matchUpData[key] = [];
          if (right.length) right.forEach((el) => matchUpData[key].push(el));
        }
      }
    }
    setMatchUps(matchUpData);
  }, [displayState]);

  return (
    <div>
      <div className='bracket-render-grid' style={displayState.displaySettings}>
        {Object.keys(matchUps)
          // if bracket has left and right wings, sort columns of matchups accordingly
          .sort((a) => (a[0] === 'l' ? 1 : -1))
          .map((round, index) => {
            return <RoundColumn key={index} roundData={matchUps[round]} />;
          })}
      </div>
      <button onClick={() => displayDispatch('toggleView')}>Toggle View</button>
    </div>
  );
};

export default Bracket;
