import { Schema, model } from 'mongoose';
import { ContestantType } from '../../types';

const contestantSchema: Schema = new Schema<ContestantType>({
  name: { type: String, required: true },
  seed: Number,
});

export const Contestant = model<ContestantType>('contestant', contestantSchema);
