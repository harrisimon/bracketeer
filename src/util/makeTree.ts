// eventually we should pull types into types.ts and import them where needed

// properties of a bracket match
export type BracketType = {
  contestant: string | undefined;
  votes: number;
  left: BracketType | null;
  right: BracketType | null;
  round: number;
};

// typing for function that makes bracket matches
export type bracketConstructor = {
  (contestants: string[] | null, round: number): BracketType;
};

// constructor function for making bracket matches
const bracketPart = (contestants: string[] | null, round: number) => {
  // only add contestant names to the outermost columns / round 1
  const contestant: string | undefined =
    round === 1 ? contestants?.shift() : undefined;

  const left: BracketType | null =
    round === 1 ? null : bracketPart(contestants, round - 1);
  const right: BracketType | null =
    round === 1 ? null : bracketPart(contestants, round - 1);

  const newMatch: BracketType = {
    contestant,
    votes: 0,
    left,
    right,
    round,
  };
  return newMatch;
};

const makeBracket = (contestants: string[]) => {
  // no logic yet for dealing with byes / number of contestants not a power of 2
  // we could just require a power of 2

  // add one to account for the top node of the tree
  let rounds = Math.log2(contestants.length) + 1;
  return bracketPart(contestants, rounds);
};

// console.log(makeBracket(['one','two','three','four','five','six','seven','eight']))

export default makeBracket;
