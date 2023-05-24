import { useState, useEffect } from 'react';
import testTournamentData from '../../assets/test_data/test-tournament';
import RoundColumn from './RoundColumn';

//typing will have to change once dummy data replaced with real API calls
// eventually pass tournament ID into Bracket
// use it to useQuery and set state
export interface matchUpRenderObjectTEST {
  [k: string]: (typeof testTournamentData.matchUps)[];
}

const Bracket = () => {
  const [matchUps, setMatchUps] = useState<matchUpRenderObjectTEST>({});
  const [unidirectional, setUnidirectional] = useState<boolean>(true);

  // the number of columns is based on how many matchups there are, and whether the view is unidirectional or not
  const [numberOfColumns, setNumberOfColumns] = useState(
    unidirectional
      ? Math.log2(testTournamentData.matchUps.length + 1)
      : Math.log2(testTournamentData.matchUps.length + 1) * 2 - 1
  );

  // create matchUps object whose keys are round numbers and whose values are the array of matchups for each column
  useEffect(() => {
    const matchUpData: matchUpRenderObjectTEST = {};
    if (unidirectional) {
      setNumberOfColumns(Math.log2(testTournamentData.matchUps.length + 1));
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
      const newNumberOfColumns =
        Math.log2(testTournamentData.matchUps.length + 1) * 2 - 1;
      setNumberOfColumns(newNumberOfColumns);

      for (let i = 1; i < newNumberOfColumns; i++) {
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
  }, [unidirectional]);

  return (
    <div>
      <div
        className='bracket-render-grid'
        style={
          unidirectional
            ? {
                gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
                columnGap: '10%',
              }
            : {
                gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
                columnGap: '5%',
              }
        }
      >
        {Object.keys(matchUps)
          // if view isn't unidirectional, sort matchups to left and right according to their position
          .sort((a, b) => (a[0] === 'l' ? 1 : -1))
          .map((round) => {
            return <RoundColumn roundData={matchUps[round]} />;
          })}
      </div>
      <button onClick={() => setUnidirectional(!unidirectional)}>
        Toggle view
      </button>
    </div>
  );
};

export default Bracket;
