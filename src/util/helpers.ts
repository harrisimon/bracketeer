import { BracketType, DepthWrapperType } from '../types';

// function wrapped in object for jest testing
// see https://stackoverflow.com/questions/45102677/testing-recursive-calls-in-jest
export const depthWrapper: DepthWrapperType = {
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
