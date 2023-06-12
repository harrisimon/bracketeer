import testTournamentData from '../../../assets/test_data/test-tournament';

// should get testTournamentData out of here somehow
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

export default initialDisplayState;
