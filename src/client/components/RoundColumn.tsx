import testTournamentData from '../../assets/test_data/test-tournament';

export interface RoundColumnProps {
  roundData: (typeof testTournamentData.matchUps)[];
}

const RoundColumn = (props: RoundColumnProps) => {
  const { roundData } = props;

  // eventually replace contestant containers with their own JSX component
  return (
    <div>
      {roundData.map((el) => {
        return (
          <div className='matchup-container'>
            <div className='contestant-container'></div>
            <div className='contestant-container'></div>
          </div>
        );
      })}
    </div>
  );
};

export default RoundColumn;
