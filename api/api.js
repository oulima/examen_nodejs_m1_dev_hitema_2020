const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const PeopleService = require('./people-service');

const peopleService = new PeopleService();
const app = express();

const v1 = express.Router();

// To be implemented!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', v1);

v1.get('/people', async (request, response) => {
    const filter = request.query;
    return response.send(peopleService.getPeople(filter));
});

v1.put("/people/:id", (request, response) => {
    const id = request.params.id;
    const people = request.body;
    
    const potentialUpdatedPeople = peopleService.updatePeople(id, people);

    if (potentialUpdatedPeople) {
        return response.sendStatus(HttpStatus.OK);
      } 
    else {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }
    });

    v1.get("/people", (request, response) => {
        const filter = request.query;
        return response.send(peopleService.getPeople(filter));
    });

module.exports = app;
