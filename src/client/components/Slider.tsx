import React from 'react';
import { FormEvent } from 'react';
import { SliderProps } from '../../types';

// deconstructing prop types from interface? see https://juhanajauhiainen.com/posts/should-you-use-reactfc-to-type-your-components
const Slider = ({ sliderVal, setSliderVal }: SliderProps) => {
  return (
    <div className='slidecontainer'>
      <h4>How many contestants?</h4>
      <input
        onChange={(e: FormEvent<HTMLInputElement>) => {
          setSliderVal(Number(e.currentTarget.value));
        }}
        type='range'
        min='2'
        max='6'
        value={sliderVal}
        className='slider'
        id='numberOfContestantsSlider'
        key='numberOfContestantsSlider'
      />
      <h5>{2 ** sliderVal}</h5>
    </div>
  );
};

export default Slider;
