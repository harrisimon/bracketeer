import { FormEvent, useCallback } from 'react';
import { ContestantProps } from '../../types';
const Contestants = ({
  contestants,
  setContestants,
  sliderVal,
}: ContestantProps) => {
  // console.log(contestants)

  const handleChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    // let items = [...contestants];
    // let item: string = [items[index]];
    // item = e.currentTarget.value;
    // items[index] = item;
    // // console.log("item", item, "items", items)
    // setContestants(items);

    let items = [...contestants];
    items[index] = e.currentTarget.value;
    setContestants(items);
    console.log(contestants);
  };

  const renderedInputs = contestants
    .slice(0, 2 ** sliderVal)
    .map((contestant, index) => (
      <div key={`textfield${index}`} className='input-field'>
        <div className='number'>{index + 1}</div>
        <input
          required={true}
          type='text'
          value={contestant}
          name={contestant}
          onChange={(e) => handleChange(e, index)}
          maxLength={64}
        />
      </div>
    ));
  return <div>{renderedInputs}</div>;
};

export default Contestants;
