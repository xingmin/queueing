var sql = require('mssql'); 
var customdefer = require('../customdefer');
var Q = require('q');

function Person(personId, externalPersonId, name){
    this.personId = personId;
    this.externalPersonId = externalPersonId;
    this.name = name;
};

Person.prototype.getPersonByExternalPersonId = function(externalPersonId){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var defered = Q.defer();
	customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('ExternalPersonId', sql.VarChar(50), externalPersonId);	
		return customdefer.request_defered(request, 'proc_getPersonByExternalPersonId');
	}).then(function(data){
		var person = null;
		var record = data.recordset[0];
		if( record && record.length>0){
			person = new Person(record.PersonId, record.ExternalPersonId, record.Name)；
		};	
		
		defered.resolve(person);
		//return person;
	},function(err){
		if (err) {
			console.log("executing proc_getPersonByExternalPersonId Error: " + err.message);
			defered.reject(err);
		}
	});
	return defered.promise;
};

module.exports = Person;