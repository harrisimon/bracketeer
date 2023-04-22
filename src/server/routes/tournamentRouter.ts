import { Router } from 'express';
import tournamentController from '../controllers/tournamentController';

const router = Router();

router.get('/:tournamentID', tournamentController.fetch, (req, res) => {
  // imagining what this will eventually return
  // should this return just the tournament? return all the matchups associated with the tournamnet?
  // might need to be two routes
  res.status(200).json(res.locals.data);
});

router.post('/', tournamentController.create, (req, res) => {
  res.sendStatus(201);
});

// only for development
router.delete('/matchups', tournamentController.deleteMatchUps, (req, res) =>
  res.sendStatus(204)
);

export default router;
