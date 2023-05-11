import { ReactElement, SetStateAction, useState, Dispatch } from 'react';

export function MultiStepForm(
  steps: ReactElement[]
  //setCurrStepIndex: Dispatch<SetStateAction<number>>
) {
  const [currStepIndex, setCurrStepIndex] = useState(0);

  function next() {
    setCurrStepIndex((i) => {
      console.log('i: ', i);
      console.log('SL-1: ', steps.length - 1);

      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }
  function goTo(index: number) {
    setCurrStepIndex(index);
  }
  return {
    currStepIndex,
    step: steps[currStepIndex],
    isFirstForm: currStepIndex === 0,
    isLastForm: currStepIndex === steps.length - 1,
    goTo,
    next,
    back,
    steps,
  };
}
