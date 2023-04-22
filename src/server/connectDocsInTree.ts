// logic for creating individual documents for each matchup, with documents connected in terms of which winners play which winners
// not well organized or modularized yet

import { Schema, Types, model } from 'mongoose';
import { MatchUpType } from '../types';
import mongoose from 'mongoose';

// connect to mongo
const MONGO_URI =
  'mongodb+srv://harrisimon:Duct7apeWallet@movielogger.rvys3ds.mongodb.net/test';
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
  const matchUpSchema: Schema = new Schema<MatchUpType>({
    contestant1: { type: Schema.Types.ObjectId, ref: 'contestant' },
    contestant2: { type: Schema.Types.ObjectId, ref: 'contestant' },
    contestant1votes: { type: Number, default: 0 },
    contestant2votes: { type: Number, default: 0 },
    next: { type: Number },
    round: { type: Number, required: true },
    matchNumber: { type: Number, required: true },
  });

  const MatchUp = model<MatchUpType>('matchUp', matchUpSchema);

  // point to parent node?
  const makeBrackets = async (round: number) => {
    let currentMatchNumber = round ** 2;

    // eventually get all the contestants -- from db? from front-end input?
    //const contestants = Contestant.find({});

    // make head node
    await MatchUp.create({
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
        /* if building the last row of the table/first round of the tournament, populate contestant fields
        // maybe something like this??
        /* if (round === 2) {
          props[0].contestant1 = contestants.pop().ObjectId
          props[1].contestant1 = contestants.pop().ObjectId
        */

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
