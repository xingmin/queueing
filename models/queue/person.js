var sql = require('mssql'); 
var customdefer = require('../customdefer');
var Q = require('q');

function Person(personId, externalPersonId, name){
    this.personId = personId;
    this.externalPersonId = externalPersonId;
    this.name = name;
    this._tryTimes = 1;
};
Person.prototype.resetTryTimesCounter=function(){
	this._tryTimes = 1;
};
Person.prototype.initByExternalPersonId= function(externalPersonId){
	var that = this;
	var defered = Q.defer();
	if(this._tryTimes < 0){
		defered.reject(new Error('failed to load person in the try times.'));
		return defered.promise;
	}
	that.getPersonByExternalPersonId(externalPersonId)
		.then(function(person){
			if(!person.personId){
				that.loadExternalToInternal(externalPersonId)
					.then(function(stat){
						return that.getPersonByExternalPersonId(externalPersonId);
					},function(err){
						defered.reject(err);
					});
			}else{
				defered.resolve(that);
			}
		},function(err){
			defered.reject(err);
		});
	return defered.promise;
};

Person.prototype.loadExternalToInternal= function(externalPersonId){
	var config = require('../connconfig').queueexternal;
	
	var conn = new sql.Connection(config);
	var that = this;

	var defered = Q.defer();
	customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('ExternalPersonId', sql.VarChar(50), externalPersonId);	
		that._tryTimes--;
		return customdefer.request_defered(request, 'proc_getPersonByExternalPersonId');
	}).then(function(stat){	
		defered.resolve(stat);
	},function(err){
		if (err) {
			console.log("executing  Error: " + err.message);
			defered.reject(err);
		}
	});
	return defered.promise;
};


Person.prototype.getPersonByExternalPersonId = function(externalPersonId){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);
	var that = this;

	var defered = Q.defer();
	customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('ExternalPersonId', sql.VarChar(50), externalPersonId);	
		that._tryTimes--;
		return customdefer.request_defered(request, 'proc_getPersonByExternalPersonId');
	}).then(function(data){
		var record = data.recordset[0];
		if( record && record.length>0){
			that.personId = record.PersonId;
			that.externalPersonId = externalPersonId;
			that.name = record.Name;
		}		
		defered.resolve(that);
	},function(err){
		if (err) {
			console.log("executing proc_getPersonByExternalPersonId Error: " + err.message);
			defered.reject(err);
		}
	});
	return defered.promise;
};

module.exports = Person;