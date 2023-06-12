import { displayStateProps } from '../../../types';
import testTournamentData from '../../../assets/test_data/test-tournament';
import { displayReducerProps } from './Bracket';

const changeDisplay = (
  state: displayStateProps,
  action: displayReducerProps
): displayStateProps => {
  const { type, payload } = action;

  console.log('DISPATCH action ' + type);

  if (type === 'updateDisplay') {
    const newProps: displayStateProps = Object.assign(state, payload);
    const newDisplaySettings = Object.assign({}, newProps.displaySettings);
    console.log(newProps.numberOfColumns);
    if (payload.unidirectional) {
      newProps.numberOfColumns = Math.log2(payload.matchUps + 1);
    } else {
      newProps.numberOfColumns = Math.log2(payload.matchUps + 1) * 2 - 1;
    }
    console.log(newProps.numberOfColumns);

    newDisplaySettings.gridTemplateColumns = `repeat(${newProps.numberOfColumns}, 1fr)`;
    newDisplaySettings.columnGap = payload.unidirectional ? '5%' : '10%';

    newProps.displaySettings = newDisplaySettings;
    console.log('NP: ', newProps);
    return newProps;
  }
  return state;
};

export default changeDisplay;
