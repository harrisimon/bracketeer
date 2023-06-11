import { useState, useEffect, useLayoutEffect, useReducer } from 'react';
import testTournamentData from '../../../assets/test_data/test-tournament';
import RoundColumn from '../RoundColumn';
import toggleView from './reducer';
import axios from 'axios';
import { MatchUpType } from '../../../types';
import processMatchups from './processMatchups';

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
  const [selected, setSelected] = useState<number[][]>([]);
  const [displayVotes, setDisplayVotes] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);

  // //useCallback?

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
    getMatchUps('64863e1bf5a5d7a132318e76');
  }, []);

  useEffect(() => {
    console.log('USEEFFECT');
    if (matchUpResponse.length) setIsLoading(false);

    // better to use array or object?
    const selectionArray = [];
    matchUpResponse.filter((el) => {
      if (el.round === round) selectionArray.push(0);
    });
  }, [matchUpResponse]);

  // create matchUps object whose keys are round numbers and whose values are the array of matchups for each column
  useLayoutEffect(() => {
    console.log('USELAYOUTEFFECT');
    // sorting logic moves to here
    // arrays? destructuring?
    // add column keys in render function
    const matchUpData = processMatchups(matchUpResponse, displayState);
    setMatchUps(matchUpData);
  }, [displayState, matchUpResponse]);

  return (
    <div>
      <div className='bracket-render-grid' style={displayState.displaySettings}>
        {matchUps.map((column, index) => {
          return (
            <RoundColumn key={index} columnData={column} currentRound={round} />
          );
        })}
      </div>
      <button onClick={() => displayDispatch('toggleView')}>Toggle View</button>
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
