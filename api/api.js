const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const v1 = express.Router();

const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const app = express();

const v1 = express.Router();

// To be implemented!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', v1);

v1.get('/people', async (request, response) => {
    const people = peopleService.getPeople(request.query)
    response.send(people);
});

v1.put('/people/:id', async (request, response) => {
    const id = request.params.id;
    const people = request.body;
    const EMPTY = 0
    const isValid = people.name && people.name.length > EMPTY;

    if (!isValid) return response.sendStatus(HttpStatus.BAD_REQUEST);

    const status = peopleService.updatePeople(id, people);
    response.sendStatus(status);
});

module.exports = app;
