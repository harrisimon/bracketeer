import { displayStateProps } from '../../../types';
import testTournamentData from '../../../assets/test_data/test-tournament';

const toggleView = (
  props: displayStateProps,
  action: string
): displayStateProps => {
  console.log('DISPATCH action ' + action);
  const newProps = Object.assign({}, props);
  if (action === 'toggleView') {
    if (props.unidirectional) {
      newProps.unidirectional = false;
      newProps.numberOfColumns =
        Math.log2(testTournamentData.matchUps.length + 1) * 2 - 1;
    } else {
      newProps.unidirectional = true;
      newProps.numberOfColumns = Math.log2(
        testTournamentData.matchUps.length + 1
      );
    }
  }
  const newDisplaySettings = Object.assign({}, newProps.displaySettings);
  newDisplaySettings.gridTemplateColumns = `repeat(${newProps.numberOfColumns}, 1fr)`;
  newDisplaySettings.columnGap = props.unidirectional ? '5%' : '10%';
  newProps.displaySettings = newDisplaySettings;
  return newProps;
};

export default toggleView;
