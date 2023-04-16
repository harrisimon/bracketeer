import { BracketType } from '../types';

// constructor function for making bracket matches
// function wrapped in object for jest testing
// see https://stackoverflow.com/questions/45102677/testing-recursive-calls-in-jest

const bracketPartWrapper = {
  bracketPart: (contestants: string[] | null, round: number) => {
    // only add contestant names to the outermost columns / round 1
    const contestant: string | undefined =
      round === 1 ? contestants?.shift() : undefined;

    const left: BracketType | null =
      round === 1
        ? null
        : bracketPartWrapper.bracketPart(contestants, round - 1);
    const right: BracketType | null =
      round === 1
        ? null
        : bracketPartWrapper.bracketPart(contestants, round - 1);

    const newMatch: BracketType = {
      contestant,
      votes: 0,
      left,
      right,
      round,
    };
    return newMatch;
  },
};
/*

const contestantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rank: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
)


const matchupSchema = new mongoose.Schema(
    {
        round: {
          type: Number,
        }
        contestant1: ObjectId | null,
        contestantOneVotes: {
            type: Number,
            default: 0,
            required: true
        },
        contestant2: ObjectId | null,
        contestantTwoVotes: {
            type: Number,
            default: 0,
            required: true
        },

    },
    {
        timestamps: true
    }
)

const bracket = new mongoose.Schema(
  {
    round1: [matchUp ObjectId],
    round2: [matchUp ObjectId],
    round3: [matchUp ObjectId],
  }
)

could we: make matchup1 (round number = highest)
query to find all matchups where round number = highest
for each, create two new matchups with round number = highest - 1
set those new matchups' objectIDs to be the left and right of the matchup above

then,
query to find all matchups whre round number = highest - 1
for each of THOSE, create two new 




*/

const makeBracket = (contestants: string[]) => {
  // add one to account for the top node of the tree
  // for now discard extras beyond power of 2
  let rounds = Math.floor(Math.log2(contestants.length)) + 1;
  return bracketPartWrapper.bracketPart(contestants, rounds);

};

let gameData = makeBracket(["1", "2", "3", "4", "5", "6", "7", "8"])
	// console.log(Object.entries(gameData))
  const showAll = (o:any) => {
    for(let entry of Object.entries(o)){
      console.log(entry)
    }
  }

// showAll(gameData)

// function to get array of all matchups in a given round
// input = round number
// output = array of matchup object

// start with head of tree (highest round number)

// if current round number = desired round number, push current matchup to array
// if current match has null children, do nothing
// if current round number > desired round number, recurse 
const getMatchUpsByRound = (curr: BracketType, target: Number, output: BracketType[] = []) => {
  if (curr.round === target) {
    output.push(curr)
  } else {
    if (curr.left !== null) getMatchUpsByRound(curr.left, target, output)
    if (curr.right !== null) getMatchUpsByRound(curr.right, target, output)
  }
  return output;
}

console.log(getMatchUpsByRound(gameData, 1))
export default makeBracket;


/*
router.post("/weather", (req, res, next) => {
	Weather.create(req.body.weather)
		.then(handle404)
		.then((weather) => {
			res.status(201).json({
				weather: weather.toObject(),
			})
		})
		.catch(next)
}

const weatherSchema = new mongoose.Schema(
    {
        temperature: {
            type: Number,
            required: true,
        },
        pressure: {
            type: Number,
            required: true,
        },
        humidity: {
            type: Number,
            required: true,
        },
        reviews: [reviewSchema]

    }, {
        timestamps: true,
    }
)

*/