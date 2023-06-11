import Xarrow from 'react-xarrows';
import { useXarrow, Xwrapper } from 'react-xarrows';
import testTournamentData from '../../assets/test_data/test-tournament';
import { useEffect, MouseEventHandler } from 'react';
import { MatchUpType } from '../../types';


const RoundColumn = (props: { columnData: MatchUpType[], currentRound: number }) => {
  console.log('from rc: ', props);
  const { columnData, currentRound } = props;
  const updateXarrow = useXarrow();
  // when roundData changes, redraw arrows based on new positions of matchup divs
  useEffect(() => {
    updateXarrow();
  }, [props]);

  // const handleHover: MouseEventHandler = (e) => {
  //   if (e.target) (e.target as HTMLElement).innerHTML = 'hovered!';
  // };

  columnData.sort((a, b) => a.matchNumber - b.matchNumber);

  return (
    <div className='round-column'>
      {columnData.map((el, index) => {
        return (
          <div
            className={`matchup-container ${
              el.round === currentRound ? 'active' : 'inactive'
            }`}
            id={`matchup${el.matchNumber}`}
            key={index}
          >
            <div className='contestant-container A'>{el.contestant1}</div>
            <div className='contestant-container B'>{el.contestant2}</div>
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
