import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export interface Controller {
  [k: string]: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> | void;
}

export interface errorObject {
  log: string;
  status: number;
  message: { err: string };
}

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

// consolidate these two interfaces - one can prob extend the other
export interface MatchUpInput {
  tournament: Types.ObjectId;
  contestant1?: Types.ObjectId;
  contestant2?: Types.ObjectId;
  round: number;
  next: number;
  matchNumber: number;
}

export interface MatchUpType {
  ObjectId: Types.ObjectId;
  tournament: Types.ObjectId; //?
  contestant1?: ContestantType;
  contestant2?: ContestantType;
  contestant1votes: number;
  contestant2votes: number;
  next?: number;
  round: number;
  matchNumber: number;
}

export interface ContestantType {
  name: String;
  seed: number;
}

// consider this drafty
export interface TournamentType {
  createTime: number; // unix timestamp
  roundInterval: number; //number?
  displayVotesDuringRound: boolean;
  // createdBy: User;
  // openToAll: boolean;
  // participants: User[]s <== actually, each user should have an array of associated tournament ids - much faster
  // winner - for easier re-access to winner later, if that's anything that matters?
  // (we might want an option for it to be open to any user -- could use an empty participant list for this, or add a prop for it)
}


