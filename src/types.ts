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
export interface MatchUpType {
  ObjectId: Types.ObjectId;
  contestant1?: ContestantType;
  contestant2?: ContestantType;
  contestant1votes: Number;
  contestant2votes: Number;
  next?: Number;
  round: Number;
  matchNumber: { type: Number };
}

export interface ContestantType {
  name: String;
  seed: number;
}

// consider this drafty
export interface Tournament {
  contestants: ContestantType[];
  startTime: number; // unix timestamp
  roundInterval: number; //number?
  displayVotesDuringRound: boolean;
  // createdBy: User;
  // participants: User[]s
  // (we might want an option for it to be open to any user -- could use an empty participant list for this, or add a prop for it)
}
