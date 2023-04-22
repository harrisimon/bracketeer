import { Controller, MatchUpInput } from '../../types';
import { Tournament } from '../models/tournament';
import { MatchUp } from '../models/matchUp';
import { Contestant } from '../models/contestant';
import dotenv from 'dotenv';
dotenv.config();

const tournamentController: Controller = {};

// just a placeholder for now to quiet the Typescript errors
tournamentController.fetch = (req, res, next) => {
  return next();
};

// Only for testing/dev
tournamentController.deleteMatchUps = async (req, res, next) => {
  try {
    if (process.env.TESTENV) await MatchUp.deleteMany({});
  } catch (err) {
    return next({
      log: `Error from tournamentController.deleteMatchUps: ${err}`,
      status: 500,
      message: { err: 'Unable to delete data' },
    });
  }
};

tournamentController.create = async (req, res, next) => {
  // check that req.body has a list of contestants
  // check that the list's length is power of 2 (and within bounds? 4 - 64?)
  console.log(req.body);

  // create tournament
  const { roundInterval, displayVotesDuringRound } = req.body;

  try {
    const tournament = await Tournament.create({
      createTime: Date.now(), // unix timestamp
      roundInterval,
      displayVotesDuringRound,
    });
    console.log(tournament);
    const tournamentID = tournament._id;

    // use connectDocsInTree logic
    // get number of rounds in this tournament:
    let round = Math.log2(req.body.contestants.length);
    let currentMatchNumber = round ** 2;

    // make head node
    await MatchUp.create({
      round,
      next: null,
      matchNumber: --currentMatchNumber,
    });

    // assuming an array of contestants in seed order
    let { contestants } = req.body;
    // indices for seeding
    let j = 0,
      k = contestants.length - 1;

    // make a new row below the current row
    while (round > 1) {
      const currentRow = await MatchUp.find({ round });

      // use for loop - forEach doesn't work asynchronously
      for (let i = 0; i < currentRow.length; i++) {
        const props: MatchUpInput[] = [
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
        // add logic for the first round: create two contestants for each matchup and associate them w/_id

        if (round === 2) {
          // for loop to avoid async/forEach problems
          for (let i = 0; i < props.length; i++) {
            const contestant1 = await Contestant.create({
              name: contestants[j],
              seed: j + 1,
            });
            props[i].contestant1 = contestant1._id;

            const contestant2 = await Contestant.create({
              name: contestants[k],
              seed: k + 1,
            });
            props[i].contestant2 = contestant2.id;
          }
          // walk pointers in from the left and right of the array of contestants so that stronger and weaker seeds are matched against each other
          j--;
          k--;
        }

        await MatchUp.insertMany(props);
      }
      round--;
    }
    return next();
  } catch (err) {
    return next({
      log: `Error from tournamentController.create: ${err}`,
      status: 400,
      message: { err: 'Failed to create tournament data' },
    });
  }

  return next();
};

export default tournamentController;
