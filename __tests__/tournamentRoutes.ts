const request = require('supertest');
import mongoose from 'mongoose';
import app from '../src/client/App.tsx';
import { Tournament } from '../src/server/models/tournament.js';
import { MatchUp } from '../src/server/models/matchUp.js';
import { Contestant } from '../src/server/models/contestant.js';

const server = 'http://localhost:3000';

const body = {
  // more props to add eventually users are implemented
  contestants: ['one', 'two', 'three', 'four'],
  roundInterval: 100000,
  displayVotesDuringRound: false,
};

let testId;

beforeEach(async () => {
  await mongoose.connect(server);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('tournament creation routes', () => {
  describe('/tournament', () => {
    describe('POST', async () => {
      const res = await request(app).post('/tournament').send(body);
      expect(res.statusCode).toBe(201);

      const allData = await Tournament.find({});
      console.log(allData);
    });
  });

  describe('/:tournamentID', () => {
    describe('GET', () => {});

    describe('DELETE', () => {});
  });

  describe('/tournament/all', () => {
    describe('DELETE', () => {});
  });
});
