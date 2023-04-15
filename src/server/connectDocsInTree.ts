// logic for creating individual documents for each matchup, with documents connected in terms of which winners play which winners
// not well organized or modularized yet

import { Schema, Types, model } from 'mongoose';
import { BracketSchemaType } from '../types';
import mongoose from 'mongoose';

// connect to mongo
const MONGO_URI =
  'mongodb+srv://jdhammond:codesmith@cluster0.1ald32x.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(MONGO_URI, {
    dbName: 'bracketeer-test',
  })
  .then(() => {
    console.log('Connected to MongoDB');
    run().catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

const run = async () => {
  // schema for bracket
  const bracketSchema: Schema = new Schema<BracketSchemaType>({
    contestant1: { type: Schema.Types.ObjectId, ref: 'contestant' },
    contestant2: { type: Schema.Types.ObjectId, ref: 'contestant' },
    contestant1votes: { type: Number, default: 0 },
    contestant2votes: { type: Number, default: 0 },
    next: { type: Number },
    round: { type: Number, required: true },
    matchNumber: { type: Number, required: true },
  });

  const Bracket = model<BracketSchemaType>('bracket', bracketSchema);

  // point to parent node?
  const makeBrackets = async (round: number) => {
    let currentMatchNumber = round ** 2 - 1;

    // make head node
    await Bracket.create({
      round,
      next: null,
      matchNumber: --currentMatchNumber,
    });

    console.log(await Bracket.find({ round }));

    // make a new row below the current row
    while (round > 1) {
      const currentRow = await Bracket.find({ round });
      console.log('round is ' + round + ' current row is ' + currentRow.length);

      for (let i = 0; i < currentRow.length; i++) {
        const props = [
          {
            round: round - 1,
            next: currentRow[i].matchNumber,
            matchNumber: --currentMatchNumber,
          },
          {
            round: round - 1,
            next: currentRow[i].matchNumber,
            matchNumber: --currentMatchNumber,
          },
        ];
        await Bracket.insertMany(props);
      }
      round--;
    }
  };

  // while testing, clear the DB before writing again
  const deleteAll = async () => await Bracket.deleteMany({});
  deleteAll();

  makeBrackets(4);
};
