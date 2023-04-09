import makeTree from '../src/util/makeTree';
import { BracketType } from '../src/types';

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

  // helper function to find depth of binary tree
  const maxDepth = (root) => {
    return !root ? 0 : 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  };

  describe('convert list of contestants into binary tree', () => {
    it('returns an object of BracketType', () => {
      const tree = makeTree(list8);
      expect(tree).toHaveProperty('contestant');
      expect(tree).toHaveProperty('votes');
      expect(tree).toHaveProperty('left');
      expect(tree).toHaveProperty('right');
      expect(tree).toHaveProperty('round');
    });

    it('has depth equal to 1 + log2 of string length', () => {
      expect(maxDepth(makeTree(list4))).toEqual(3);
      expect(maxDepth(makeTree(list8))).toEqual(4);
      expect(maxDepth(makeTree(list16))).toEqual(5);
    });

    it('has undefined contestant property everywhere but round 1', () => {
      // helper function to check contestant and round properties
      const propCheck = (root) => {
        expect(
          (root.contestant === undefined && root.round > 1) ||
            (typeof root.contestant === 'string' && root.round === 1)
        );
        if (root.left) propCheck(root.left);
        if (root.right) propCheck(root.right);
      };

      it('throws an error if the list of contestants does not contain a number of items that is a power of two', () => {
        expect(makeTree(list5)).toBeInstanceOf(Error);
      });
    });
  });
});
