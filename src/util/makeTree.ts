import { BracketType, bracketConstructor } from '../types';

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
  // add one to account for the top node of the tree
  // for now discard extras beyond power of 2
  let rounds = Math.floor(Math.log2(contestants.length)) + 1;
  return bracketPart(contestants, rounds);
};

console.log(makeBracket(['one', 'two', 'three', 'four']));

function propCheck(root: BracketType | null): boolean | undefined {
  console.log(root);
  if (root !== null) {
    if (root.contestant === undefined && root.round === 1) return false;
    if (typeof root.contestant === 'string' && root.round > 1) return false;
    if (root.left) propCheck(root.left);
    if (root.right) propCheck(root.right);
    return true;
  }
}

function depth(root: BracketType | null): number {
  if (!root) return 0;
  return 1 + depth(root.left);
}

const tree = makeBracket(['one', 'two', 'three', 'four']);

console.log(propCheck(tree));
console.log(depth(tree));

export default makeBracket;
