import makeTree from '../src/util/makeTree';
import { propCheck, depthWrapper } from '../src/util/helpers';

describe('makeTree', () => {
  const list4 = ['one', 'two', 'three', 'four'];
  // const list5 = ['one', 'two', 'three', 'four', 'five'];
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

  const tree4 = makeTree(list4);
  const tree8 = makeTree(list8);

  describe('convert list of contestants into binary tree', () => {
    it('returns an object of BracketType', () => {
      expect(tree4).toHaveProperty('contestant');
      expect(tree4).toHaveProperty('votes');
      expect(tree4).toHaveProperty('left');
      expect(tree4).toHaveProperty('right');
      expect(tree4).toHaveProperty('round');
    });

    it('has depth equal to 1 + log2 of string length', () => {
      expect(depthWrapper.depth(tree4)).toEqual(3);
      expect(depthWrapper.depth(tree8)).toEqual(4);
    });

    it('has undefined contestant property everywhere but round 1', () => {
      expect(propCheck(tree4));
      expect(propCheck(tree8));
    });

    // it('throws an error if the list of contestants does not contain a number of items that is a power of two', () => {
    //   expect(makeTree(list5)).toThrow(RangeError);
    // });
  });
});
