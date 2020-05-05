const fs = require('fs');
const HttpStatus = require('http-status-codes');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    updatePeople(id, people) {
        let target = this.peoples[id]
        if (target === undefined) {
            return HttpStatus.NOT_FOUND;
        }
        this.peoples[id] = people;
        return HttpStatus.OK;
    }
    
    getPeople(filters) {
        const EMPTY = 0
        if (Object.entries(filters).length === EMPTY){
            return this.peoples;
        }

        let filtered = []
        this.peoples.forEach(people => {
            for (const key in filters) {
                if (people[key] === filters[key]) {
                    filtered.push(people)
                }
            }
        });
        return filtered;
    }
}