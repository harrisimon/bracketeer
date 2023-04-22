import { Types } from 'mongoose';

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

export interface MatchUpSchemaType {
  ObjectId: Types.ObjectId;
  contestant1?: BracketType; // fix -- contestants aren't brackets
  contestant2?: BracketType;
  contestant1votes: Number;
  contestant2votes: Number;
  next?: Number;
  round: Number;
  matchNumber: { type: Number };
}
