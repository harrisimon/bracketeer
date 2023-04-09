export type BracketType = {
  contestant: string | undefined;
  votes: number;
  left: BracketType | null;
  right: BracketType | null;
  round: number;
};

export type bracketConstructor = {
  (contestants: string[] | null, round: number): BracketType;
};
