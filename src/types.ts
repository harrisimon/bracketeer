export interface BracketType {
  contestant: string | undefined;
  votes: number;
  left: BracketType | null;
  right: BracketType | null;
  round: number;
}

export interface BracketConstructor {
  (contestants: string[] | null, round: number): BracketType;
}

export interface DepthWrapperType {
  depth: (root: BracketType | null) => number;
}
