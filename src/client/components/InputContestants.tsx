import { useState, useEffect, useCallback } from 'react';
import Slider from './Slider';
import InputsArray from './InputsArray';
import Contestants from './Contestants';


// a submit button could send the contestants array to a separate view for seed-ordering, or straight to the create tournament api if already ordered (or if user doesn't care about order)

const Input = () => {
  const [sliderVal, setSliderVal] = useState(3);

  const [contestants, setContestants] = useState(new Array(64).fill(''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('le contestant', contestants.slice(0, 2 ** sliderVal));
  };


  return (
    <div>
      <div>hi</div>
      <Slider sliderVal={sliderVal} setSliderVal={setSliderVal} />
      {/* <InputsArray
        contestants={contestants}
        setContestants={setContestants}
        sliderVal={sliderVal}
      /> */}
      <form onSubmit={handleSubmit}>
        <Contestants
          contestants={contestants}
          setContestants={setContestants}
          sliderVal={sliderVal}
        />
        <button>Submit!</button>
      </form>

    </div>
  );
};

export default Input;
