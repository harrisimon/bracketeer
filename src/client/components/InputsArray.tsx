import { useCallback, FormEvent } from 'react';
import { InputProps } from '../../types';

const InputsArray = ({
  contestants,
  setContestants,
  sliderVal,
}: InputProps) => {
  const visibleTextFields = () => {
    const fields = [];
    for (let i = 0; i < 2 ** sliderVal; i++) {
      const newInput = (
        <li key={i}>

          <input
            type='text'
            value={contestants[i]}
            key={`textField${i}`}
            maxLength={64}
            // I wanted to debounce but it turns out that's not straightforward when using e.currentTarget.value
            onChange={(e: FormEvent<HTMLInputElement>) => {
              let arr = [...contestants];
              arr[i] = e.currentTarget.value;
              setContestants(arr);
            }}
          />
        </li>
      );
      fields.push(newInput);
    }
    return fields;
  };

  return <div className='textInputGrid'>{visibleTextFields()}</div>;
};

export default InputsArray;
