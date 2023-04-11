import { BracketType } from '../types';

// constructor function for making bracket matches
// function wrapped in object for jest testing
// see https://stackoverflow.com/questions/45102677/testing-recursive-calls-in-jest

const bracketPartWrapper = {
  bracketPart: (contestants: string[] | null, round: number) => {
    // only add contestant names to the outermost columns / round 1
    const contestant: string | undefined =
      round === 1 ? contestants?.pop() : undefined;

    const left: BracketType | null =
      round === 1
        ? null
        : bracketPartWrapper.bracketPart(contestants, round - 1);
    const right: BracketType | null =
      round === 1
        ? null
        : bracketPartWrapper.bracketPart(contestants, round - 1);

    const newMatch: BracketType = {
      contestant,
      votes: 0,
      left,
      right,
      round,
    };
    return newMatch;
  },
};

const makeBracket = (contestants: string[]) => {
  // reverse the array so we can pop rather than shift as we add elements
  contestants = contestants.reverse();
  // add one to account for the top node of the tree
  // for now discard extras beyond power of 2
  let rounds = Math.floor(Math.log2(contestants.length)) + 1;
  return bracketPartWrapper.bracketPart(contestants, rounds);
};

console.log(makeBracket(['one', 'two', 'three', 'four']));

export default makeBracket;
