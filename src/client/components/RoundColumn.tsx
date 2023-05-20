import testTournamentData from '../../assets/test_data/test-tournament';

export interface RoundColumnProps {
  roundData: (typeof testTournamentData.matchUps)[];
}

const RoundColumn = (props: RoundColumnProps) => {
  const { roundData } = props;

  // eventually replace contestant containers with their own JSX component
  return (
    <div className='round-column'>
      {roundData.map((el) => {
        return (
          <div className='matchup-container'>
            <div className='contestant-container'>{Object.keys(el)[0]}</div>
            <div className='contestant-container'>{Object.keys(el)[1]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RoundColumn;
