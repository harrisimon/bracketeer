import { useState, useEffect, useLayoutEffect, useReducer } from 'react';
import testTournamentData from '../../../assets/test_data/test-tournament';
import RoundColumn from '../RoundColumn';
import toggleView from './reducer';
import axios from 'axios';
import { MatchUpType } from '../../../types';

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

  const [isLoading, setIsLoading] = useState(true);
  // use this vv rather than isLoading to avoid redudancy?
  const [matchUpResponse, setMatchUpResponse] = useState<MatchUpType[]>([]);
  const [matchUps, setMatchUps] = useState<MatchUpType[][]>([]);

  // //useCallback?
  // add try/catch
  const getMatchUps = async (id: string) => {
    console.log('GET');
    try {
      const response = await axios.get(
        `http://localhost:8000/tournament/${id}`
      );
      console.log('axios res: ', response.data);
      setMatchUpResponse(response.data.matchUps);
    } catch (err) {
      console.log(err);
    }
  };

  // tournament should have a currentRound property, maybe?
  // more semantic but another failure point to calculate the round server-side
  // but also the server has to get involved at some point to advanced contestants
  // hard-code test tournament id for now
  useEffect(() => {
    getMatchUps('647a955d7e7a4062868ca305');
  }, []);

  useEffect(() => {
    if (matchUpResponse.length) setIsLoading(false);
  }, [matchUpResponse]);

  // create matchUps object whose keys are round numbers and whose values are the array of matchups for each column
  useLayoutEffect(() => {
    // sorting logic moves to here
    // arrays? destructuring?
    // add column keys in render function
    matchUpResponse.sort((a, b) => a.matchNumber - b.matchNumber);

    const matchUpData: MatchUpType[][] = [];
    const { unidirectional, numberOfColumns } = displayState;
    if (unidirectional) {
      for (let i = 1; i <= numberOfColumns; i++) {
        const matchUpsFromRound = matchUpResponse.filter(
          (el) => el.round === i
        );
        matchUpData.push(matchUpsFromRound);
      }
    } else {
      console.log(numberOfColumns);
      for (let i = (numberOfColumns + 1) / 2; i > 0; i--) {
        const matchUpsFromRound = matchUpResponse.filter(
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
  }, [displayState, matchUpResponse]);

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
