import {
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
  Reducer,
} from 'react';
import testTournamentData from '../../../assets/test_data/test-tournament';
import RoundColumn from '../RoundColumn';
import changeDisplay from './reducer';
import axios from 'axios';
import { MatchUpType, displayStateProps } from '../../../types';
import processMatchups from './processMatchups';
import initialDisplayState from './initialDisplayState';

const TEST_TOURNAMENT_ID = '64863e1bf5a5d7a132318e76';

export interface displayReducerProps {
  type: string;
  payload: any;
}

const Bracket = () => {
  const [displayState, displayDispatch] = useReducer(
    changeDisplay,
    initialDisplayState
  );

  const [isLoading, setIsLoading] = useState(true);
  // use this vv rather than isLoading to avoid redudancy?
  const [matchUpResponse, setMatchUpResponse] = useState<MatchUpType[]>([]);
  const [matchUps, setMatchUps] = useState<MatchUpType[][]>([]);
  const [selected, setSelected] = useState<number[][]>([]);
  const [displayVotes, setDisplayVotes] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);

  // //useCallback w/active tournament ID?

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
    getMatchUps(TEST_TOURNAMENT_ID);
  }, []);

  useEffect(() => {
    console.log('USEEFFECT');
    // better to use array or object?
    const selectionArray = [];
    matchUpResponse.filter((el) => {
      if (el.round === round) selectionArray.push(0);
    });
  }, [matchUpResponse]);

  // convert response from DB into array of arrays of matchup objects -- one sub-array per displayed column
  useLayoutEffect(() => {
    console.log('ULE');
    if (matchUpResponse.length) setIsLoading(false);
    const matchUpData = processMatchups(matchUpResponse, displayState);
    setMatchUps(matchUpData);
  }, [displayState, matchUpResponse]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className='bracket-render-grid' style={displayState.displaySettings}>
        {matchUps.map((column, index) => {
          return (
            <RoundColumn key={index} columnData={column} currentRound={round} />
          );
        })}
      </div>
      <button
        onClick={() =>
          displayDispatch({
            type: 'updateDisplay',
            payload: {
              unidirectional: !displayState.unidirectional,
              matchUps: matchUpResponse.length,
            },
          })
        }
      >
        Toggle View
      </button>
      <button onClick={() => setRound(() => round + 1)}>
        TEST: Next Round
      </button>
      <button onClick={() => setRound(() => round - 1)}>
        TEST: Previous Round
      </button>
    </div>
  );
};

export default Bracket;
