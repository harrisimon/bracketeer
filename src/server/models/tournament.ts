import { Schema, model } from 'mongoose';
import { TournamentType, ContestantType } from '../../types';

const TournamentSchema: Schema = new Schema<TournamentType>({
  contestants: {
    type: {} as ContestantType[],
    required: true,
  },
  startTime: Number,
  roundInterval: Number,
  displayVotesDuringRound: { type: Boolean, default: true },
});

export const Tournament = model<TournamentType>('tournament', TournamentSchema);
