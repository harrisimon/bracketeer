import Xarrow from 'react-xarrows';
import { useXarrow, Xwrapper } from 'react-xarrows';
import testTournamentData from '../../assets/test_data/test-tournament';
import { useEffect } from 'react';

export interface RoundColumnProps {
  roundData: typeof testTournamentData.matchUps;
}

const RoundColumn = (props: RoundColumnProps) => {
  const { roundData } = props;

  const updateXarrow = useXarrow();

  // when roundData changes, redraw arrows based on new positions of matchup divs
  useEffect(() => {
    updateXarrow();
  }, [roundData]);

  roundData.sort((a, b) => a.matchNumber - b.matchNumber);

  return (
    <div className='round-column'>
      {roundData.map((el, index) => {
        return (
          <div
            className='matchup-container'
            id={`matchup${el.matchNumber}`}
            key={index}
          >
            <div className='contestant-container'>{el.matchNumber}</div>
            <div className='contestant-container'>{el.matchNumber}</div>
            {el.next && (
              <Xwrapper>
                <Xarrow
                  start={`matchup${el.matchNumber}`}
                  end={`matchup${el.next}`}
                  path='grid'
                  headSize={3}
                />
              </Xwrapper>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RoundColumn;
