import { Schema, model } from 'mongoose';
import { MatchUpType } from '../../types';

const matchUpSchema: Schema = new Schema<MatchUpType>({
  tournament: { type: Schema.Types.ObjectId, ref: 'tournament' },
  contestant1: { type: Schema.Types.ObjectId, ref: 'contestant' },
  contestant2: { type: Schema.Types.ObjectId, ref: 'contestant' },
  contestant1votes: { type: Number, default: 0 },
  contestant2votes: { type: Number, default: 0 },
  next: { type: Number }, // refers by match number to the match that the winner of this matchup will join
  round: { type: Number, required: true },
  matchNumber: { type: Number, required: true }, // unique number for each match (right now just using 1 - n ** 2 - 1)
});

export const MatchUp = model<MatchUpType>('matchup', matchUpSchema);
