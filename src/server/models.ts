import { Schema, Types, model } from 'mongoose';
import { BracketType } from '../types';
import makeTree from '../util/makeTree';
import mongoose from 'mongoose';

// actually connect to mongo to try this out
const MONGO_URI =
  'mongodb+srv://jdhammond:codesmith@cluster0.1ald32x.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    dbName: 'bracketeer-test',
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

interface BracketSchemaType {
  ObjectId: Types.ObjectId;
  contestant1?: BracketType; // fix -- contestants aren't brackets
  contestant2?: BracketType;
  contestant1votes: Number;
  contestant2votes: Number;
  next?: Types.ObjectId;
  round: Number;
}

// schema for bracket
const bracketSchema: Schema = new Schema<BracketSchemaType>({
  contestant1: { type: Schema.Types.ObjectId, ref: 'contestant' },
  contestant2: { type: Schema.Types.ObjectId, ref: 'contestant' },
  contestant1votes: { type: Number, default: 0 },
  contestant2votes: { type: Number, default: 0 },
  next: { type: Types.ObjectId, ref: 'Bracket' },
  round: { type: Number, required: true },
});

const Bracket = model<BracketSchemaType>('Bracket', bracketSchema);

// point to parent node?
const makeBrackets = async (round: number, next?: Types.ObjectId) => {
  // ??

  const bracket = new Bracket({
    round,
    next,
  });

  await bracket.save();

  if (round > 0) {
    const currentRow: BracketSchemaType[] = await Bracket.find({
      round: round,
    }); // try taking out second round - should work here
    currentRow.forEach((el: BracketSchemaType) => {
      makeBrackets(round - 1, el.ObjectId);
    });
  }
};

makeBrackets(4);

async () => {
  const allBrackets = await Bracket.find({});
  console.log(allBrackets);
};

// recursive business
// bracketSchema.add({ leftPreceding: bracketSchema });
// bracketSchema.add({ rightPreceding: bracketSchema });

// await connect

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
