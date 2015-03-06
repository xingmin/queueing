var sql = require('mssql'); 
var customdefer = require('../customdefer');


function Person(personId, personIdExternal, name){
    this.personId = personId;
    this.personIdExternal = personIdExternal;
    this.name = name;
};

module.exports = Person;