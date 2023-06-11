import { Schema, model } from 'mongoose';
import { MatchUpType, ContestantType } from '../../types';
import { Contestant } from './contestant';

const matchUpSchema: Schema = new Schema<MatchUpType>({
  tournament: { type: Schema.Types.ObjectId, ref: 'tournament' },
  contestant1: { type: Object },
  contestant2: { type: Object },
  contestant1votes: { type: Number, default: 0 },
  contestant2votes: { type: Number, default: 0 },
  next: { type: Number }, // refers by match number to the match that the winner of this matchup will join
  round: { type: Number, required: true },
  matchNumber: { type: Number, required: true }, // unique number for each match (right now just using 1 - n ** 2 - 1)
});

export const MatchUp = model<MatchUpType>('matchup', matchUpSchema);
