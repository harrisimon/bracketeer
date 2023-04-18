import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

export interface ContestantSchemaType {
  name: String;
  seed: number;
}

const contestantSchema: Schema = new Schema<ContestantSchemaType>({
  name: { type: String, required: true },
  seed: Number,
});

const Contestant = model<ContestantSchemaType>('contestant', contestantSchema);
