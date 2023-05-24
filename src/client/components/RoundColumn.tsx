import Xarrow from 'react-xarrows';
import { useEffect, ReactElement } from 'react';
import testTournamentData from '../../assets/test_data/test-tournament';

export interface RoundColumnProps {
  roundData: typeof testTournamentData.matchUps;
  unidirectional: boolean;
}

const RoundColumn = (props: RoundColumnProps) => {
  const { roundData, unidirectional } = props;
  roundData.sort((a, b) => a.matchNumber - b.matchNumber);
  console.log('rounddata: ', roundData);

  const arrows: ReactElement[] = [];

  useEffect(() => {
    roundData.forEach((el) => {
      if (el.next)
        arrows.push(
          <Xarrow
            start={`matchup${el.matchNumber}`}
            end={`matchup${el.next}`}
            path='grid'
          />
        );
    });
  }, [unidirectional]);

  // eventually replace contestant containers with their own JSX component
  return (
    <div className='round-column'>
      {roundData.map((el) => {
        return (
          <div
            className='matchup-container'
            id={`matchup${el.matchNumber}`}
            style={
              el.contestant1
                ? { background: 'lavender' }
                : { background: 'white' }
            }
          >
            <div className='contestant-container'>
              {el.matchNumber} next={`matchup${el.next}`}
            </div>
            <div className='contestant-container'>
              {el.matchNumber} next={`matchup${el.next}`}
            </div>
            <div>{arrows}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RoundColumn;
