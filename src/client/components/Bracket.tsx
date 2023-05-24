import { useState, useEffect } from 'react';
import testTournamentData from '../../assets/test_data/test-tournament';
import RoundColumn from './RoundColumn';
import { useXarrow } from 'react-xarrows';

//typing will have to change once I replace dummy data with real API calls
// eventually pass tournament ID into Bracket
// use it to useQuery and set state

// grid-template-areas better?

export interface matchUpRenderObjectTEST {
  [k: string]: (typeof testTournamentData.matchUps)[];
}

const Bracket = () => {
  const [matchUps, setMatchUps] = useState<matchUpRenderObjectTEST>({});
  const [unidirectional, setUnidirectional] = useState<boolean>(true);
  const [numberOfRounds, setNumberOfRounds] = useState(
    unidirectional
      ? Math.log2(testTournamentData.matchUps.length + 1)
      : Math.log2(testTournamentData.matchUps.length + 1) * 2 - 1
  );

  const updateXarrow = useXarrow();

  // get number of rounds
  // use it to set number of rows/cols
  useEffect(() => {
    const matchUpData: matchUpRenderObjectTEST = {};
    if (unidirectional) {
      setNumberOfRounds(Math.log2(testTournamentData.matchUps.length + 1));
      for (let i = 1; i <= numberOfRounds; i++) {
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
      setNumberOfRounds(newNumberOfColumns);

      for (let i = 1; i < newNumberOfColumns; i++) {
        const matchUpsFromRound = testTournamentData.matchUps.filter(
          (el) => el.round === i
        );

        // Math.ceil accounts for last iterations, when matchUpsFromRound has a length of 1
        // possible there's a better way to short-circuit on the last iteration
        const middleIndex = Math.ceil(matchUpsFromRound.length / 2);
        const left = matchUpsFromRound.slice(0, middleIndex);
        const right = matchUpsFromRound.slice(middleIndex);
        if (matchUpsFromRound.length === 1) {
          console.log('LENGTH CHECK', left, right);
        }
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
    console.log('mu: ', matchUpData);
    setMatchUps(matchUpData);
    updateXarrow();
  }, [unidirectional]);

  return (
    <div>
      <div
        className='bracket-render-grid'
        style={
          unidirectional
            ? {
                gridTemplateColumns: `repeat(${numberOfRounds}, 1fr)`,
                columnGap: '10%',
              }
            : {
                gridTemplateColumns: `repeat(${numberOfRounds}, 1fr)`,
                columnGap: '5%',
              }
        }
      >
        {Object.keys(matchUps)
          .sort((a, b) => (a[0] === 'l' ? 1 : -1))
          .map((round) => {
            return (
              <RoundColumn
                roundData={matchUps[round]}
                unidirectional={unidirectional}
              />
            );
          })}
      </div>
      <button onClick={() => setUnidirectional(!unidirectional)}>
        Toggle view
      </button>
    </div>
  );
};

export default Bracket;
