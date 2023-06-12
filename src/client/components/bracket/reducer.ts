import { displayStateProps } from '../../../types';

const toggleView = (
  props: displayStateProps,
  action: { type: string; payload: any }
): displayStateProps => {
  const { type, payload } = action;

  if (type === 'updateDisplay') {
    const newProps = { ...props };
    newProps.unidirectional = payload.unidirectional;
    if (newProps.unidirectional) {
      newProps.numberOfColumns = Math.log2(payload.numberOfMatchUps + 1);
    } else {
      newProps.numberOfColumns =
        Math.log2(payload.numberOfMatchUps + 1) * 2 - 1;
    }

    const newDisplaySettings = Object.assign({}, newProps.displaySettings);
    newDisplaySettings.gridTemplateColumns = `repeat(${newProps.numberOfColumns}, 1fr)`;
    newDisplaySettings.columnGap = props.unidirectional ? '5%' : '10%';
    newProps.displaySettings = newDisplaySettings;
    return newProps;
  }
  return props;
};

export default toggleView;
