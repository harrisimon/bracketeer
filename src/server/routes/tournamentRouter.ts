import { Router } from 'express';
import tournamentController from '../controllers/tournamentController.js';

export const tournamentRouter = Router();

tournamentRouter.get(
  '/:tournamentID',
  tournamentController.getData,
  (req, res) => {
    // imagining what this will eventually return
    // should this return just the tournament? return all the matchups associated with the tournamnet?
    // might need to be two routes
    res.status(200).json(res.locals);
  }
);

tournamentRouter.post('/', tournamentController.create, (req, res) => {
  res.sendStatus(201);
});

// only for development
tournamentRouter.delete('/all', tournamentController.clearData, (req, res) =>
  res.sendStatus(204)
);
