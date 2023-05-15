import { FormEvent, useCallback } from 'react';
import { ContestantProps } from '../../types';
const Contestants = ({
  contestants,
  setContestants,
  sliderVal,
}: ContestantProps) => {
  const handleChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    let items = [...contestants];
    items[index].name = e.currentTarget.value;
    setContestants(items);
  };

  const renderedInputs = contestants
    .slice(0, 2 ** sliderVal)
    .map((contestant, index) => (
      <div key={`textfield${index}`} className='input-field'>
        <div className='number'>{index + 1}</div>
        <input
          required={true}
          type='text'
          value={contestant.name ?? ''}
          name={contestant.name}
          onChange={(e) => handleChange(e, index)}
          maxLength={64}
        />
      </div>
    ));

  return <div>{renderedInputs}</div>;
};

export default Contestants;
