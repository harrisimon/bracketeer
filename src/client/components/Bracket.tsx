import { useState, useEffect, useRef } from 'react';
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
  const [numberOfRounds, setNumberOfRounds] = useState(
    Math.log2(testTournamentData.matchUps.length + 1)
  );
  // get number of rounds
  // use it to set number of rows/cols
  useEffect(() => {
    const matchUpData: matchUpRenderObjectTEST = {};
    for (let i = 1; i <= numberOfRounds; i++) {
      const key = 'round' + i.toString();
      matchUpData[key] = [];
      const matchUpsFromRound = testTournamentData.matchUps.filter(
        (el) => el.round === i
      );
      matchUpData[key].push(matchUpsFromRound);
    }
    console.log('matchUpData in local object: ', matchUpData);
    setMatchUps(matchUpData);
  }, []);

  const roundsArray = [];
  for (const round in matchUps) {
    roundsArray.push(<RoundColumn roundData={matchUps[round]} />);
  }

  // unidirectional bracket for now
  return (
    <div
      className='bracket-render-grid'
      style={{
        gridTemplateColumns: `repeat (${numberOfRounds}, 1fr)`,
      }}
    >
      {roundsArray.map((round) => (
        <div>{round}</div>
      ))}
    </div>
  );
};

export default Bracket;
