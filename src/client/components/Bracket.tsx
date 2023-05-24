import { useState, useEffect } from 'react';
import testTournamentData from '../../assets/test_data/test-tournament';
import RoundColumn from './RoundColumn';
//typing will have to change once I replace dummy data with real API calls
// eventually pass tournament ID into Bracket
// use it to useQuery and set state

// grid-template-areas better?

export interface matchUpRenderObjectTEST {
  [k: string]: (typeof testTournamentData.matchUps)[];
}

const Bracket = () => {
  const [matchUps, setMatchUps] = useState<matchUpRenderObjectTEST>({});
  const [unidirectional, setUnidirectional] = useState<boolean>(false);
  const [numberOfRounds, setNumberOfRounds] = useState(
    unidirectional
      ? Math.log2(testTournamentData.matchUps.length + 1)
      : Math.log2(testTournamentData.matchUps.length + 1) * 2 - 1
  );

  // get number of rounds
  // use it to set number of rows/cols
  useEffect(() => {
    const matchUpData: matchUpRenderObjectTEST = {};
    if (unidirectional) {
      setNumberOfRounds(Math.log2(testTournamentData.matchUps.length + 1));
      for (let i = 1; i <= numberOfRounds; i++) {
        const key = 'lRound' + i.toString();
        matchUpData[key] = [];
        const matchUpsFromRound = testTournamentData.matchUps.filter(
          (el) => el.round === i
        );
        matchUpsFromRound.forEach((el) => matchUpData[key].push(el));
      }
    } else {
      setNumberOfRounds(
        Math.log2(testTournamentData.matchUps.length + 1) * 2 - 1
      );
      for (let i = 1; i <= numberOfRounds / 2 + 1; i++) {
        const matchUpsFromRound = testTournamentData.matchUps.filter(
          (el) => el.round === i
        );
        const middleIndex = matchUpsFromRound.length / 2;
        const left = matchUpsFromRound.slice(0, middleIndex);
        const right = matchUpsFromRound.slice(middleIndex);
        console.log(left, right);
        if (left.length) {
          let key = 'lRound' + i.toString();
          matchUpData[key] = [];
          left.forEach((el) => matchUpData[key].push(el));
        }
        if (right.length) {
          let key = 'rRound' + i.toString();
          matchUpData[key] = [];
          if (right.length) right.forEach((el) => matchUpData[key].push(el));
        }
      }
    }
    setMatchUps(matchUpData);
  }, [unidirectional]);

  // const roundsArray = [];
  // for (const round in matchUps) {
  //   roundsArray.push(<RoundColumn roundData={matchUps[round]} />);
  // }

  console.log('mu: ', matchUps);
  console.log('numrounds: ', numberOfRounds);
  // unidirectional bracket for now
  return (
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
        // .sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)))
        .map((round) => {
          return <RoundColumn roundData={matchUps[round]} />;
        })}
    </div>
  );
};

export default Bracket;
