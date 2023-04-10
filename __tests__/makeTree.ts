import makeTree from '../src/util/makeTree';
import { propCheck, maxDepth, depthWrapper } from '../src/util/helpers';

describe('makeTree', () => {
  const list4 = ['one', 'two', 'three', 'four'];
  const list5 = ['one', 'two', 'three', 'four', 'five'];
  const list8 = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
  ];
  const list16 = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
  ];
  const tree = makeTree(list8);

  describe('convert list of contestants into binary tree', () => {
    it('returns an object of BracketType', () => {
      expect(tree).toHaveProperty('contestant');
      expect(tree).toHaveProperty('votes');
      expect(tree).toHaveProperty('left');
      expect(tree).toHaveProperty('right');
      expect(tree).toHaveProperty('round');
    });

    it('has depth equal to 1 + log2 of string length', () => {
      expect(depthWrapper.depth(tree)).toEqual(4);
    });

    it('has undefined contestant property everywhere but round 1', () => {
      expect(propCheck(tree));
    });

    // it('throws an error if the list of contestants does not contain a number of items that is a power of two', () => {
    //   expect(makeTree(list5)).toThrow(RangeError);
    // });
  });
});
