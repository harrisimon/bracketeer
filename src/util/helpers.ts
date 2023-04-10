import { BracketType } from '../types';
import makeTree from './makeTree';
// import { depthWrapper } from './helpers';

// helper function to find depth of binary tree
export function maxDepth(root: BracketType | null): number {
  return !root ? 0 : 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

export interface depthWrapperType {
  depth: (root: BracketType | null) => number;
}

export const depthWrapper: depthWrapperType = {
  depth: (root) => {
    if (!root) return 0;
    return 1 + depthWrapper.depth(root.left);
  },
};

// helper function to check whether contestant names are only populated in outermost nodes
export function propCheck(root: BracketType | null): boolean | undefined {
  console.log(root);
  if (root !== null) {
    if (root.contestant === undefined && root.round === 1) return false;
    if (typeof root.contestant === 'string' && root.round > 1) return false;
    if (root.left) propCheck(root.left);
    if (root.right) propCheck(root.right);
    return true;
  }
}
