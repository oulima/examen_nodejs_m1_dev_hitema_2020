const express = require('express');

const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const app = express();

const v1 = express.Router();

// To be implemented!

module.exports = app;
