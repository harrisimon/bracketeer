import { Schema, Types, model } from 'mongoose';
import { BracketType } from '../types';
import makeTree from '../util/makeTree';
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

interface BracketSchemaType {
  ObjectId: Types.ObjectId;
  contestant1?: BracketType; // fix -- contestants aren't brackets
  contestant2?: BracketType;
  contestant1votes: Number;
  contestant2votes: Number;
  next?: Types.ObjectId;
  round: Number;
  // matchNumber: Number;
}

const run = async () => {
  // schema for bracket
  const bracketSchema: Schema = new Schema<BracketSchemaType>({
    contestant1: { type: Schema.Types.ObjectId, ref: 'contestant' },
    contestant2: { type: Schema.Types.ObjectId, ref: 'contestant' },
    contestant1votes: { type: Number, default: 0 },
    contestant2votes: { type: Number, default: 0 },
    next: { type: Types.ObjectId, ref: 'Bracket' },
    round: { type: Number, required: true },
    // matchNumber: { type: Number, required: true },
  });

  const Bracket = model<BracketSchemaType>('bracket', bracketSchema);

  // point to parent node?
  const makeBrackets = async (round: number) => {
    // make head node
    await Bracket.create({
      round,
      next: null,
    });

    while (round > 0) {
      const currentRow = await Bracket.find({ round });
      console.log('round is ' + round + ' current row is ' + currentRow.length);

      for (let i = 0; i < currentRow.length; i++) {
        const props = [
          { round: round - 1, next: currentRow[i].ObjectId },
          { round: round - 1, next: currentRow[i].ObjectId },
        ];
        await Bracket.insertMany(props);
      }

      round--;
    }
  };

  const deleteAll = async () => await Bracket.deleteMany({});
  deleteAll();

  makeBrackets(3);
};

// start recursive fn here w/number of entrants? number of rounds?

/*
run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/test');

  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  await user.save();

  console.log(user.email); // 'bill@initech.com'
}
*/
