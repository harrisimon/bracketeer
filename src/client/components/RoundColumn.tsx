import Xarrow from 'react-xarrows';
import testTournamentData from '../../assets/test_data/test-tournament';

export interface RoundColumnProps {
  roundData: typeof testTournamentData.matchUps;
}

const RoundColumn = (props: RoundColumnProps) => {
  const { roundData } = props;
  console.log('rounddata: ', roundData);
  // eventually replace contestant containers with their own JSX component
  return (
    <div className='round-column'>
      {roundData.map((el, index) => {
        return (
          
          <div className='matchup-container' id={`matchup${el.matchNumber}`} key={index}>
            <div className='contestant-container'>{el.matchNumber}</div>
            <div className='contestant-container'>{el.matchNumber}</div>
            {el.next && (
              <Xarrow
                start={`matchup${el.matchNumber}`}
                end={`matchup${el.next}`}
                path='grid'
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RoundColumn;
