var sql = require('mssql'); 
var Q = require('q');


var conn_defered = function(conn){
	var defered = Q.defer();
	conn.connect(function(err){
		if(err){
			defered.reject(err);
		}else{
			defered.resolve(conn);
		}		
	});
	return defered.promise;
};

var request_defered = function(reqest, proc){
	var defered = Q.defer();
	reqest.execute(proc, function(err,recordsets, returnValue){
		if(err){
			defered.reject(err);
		}else{
			defered.resolve({'recordset': recordsets, 'ret': returnValue});
		}		
	});
	return defered.promise;
};

function QueueClass(name, id){
    this.id = id;
    this.name = name;
};
QueueClass.prototype.getAllQueueClass = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var promise = conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		return request_defered(request, 'proc_getQueueClassList');
	}).then(function(data){
		var ret = [];
		data.recordset[0].forEach(function(value){
			ret.push((new QueueClass(value.name, value.id)));
		});
		return ret;
	},function(err){
		if (err) {
			console.log("executing proc_addQueueClass Error: " + err.message);
			return err;
		}
	});
	return promise;
};


QueueClass.prototype.createNewQueueClass = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);
	var that = this;
	
	var promise = conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('name', sql.NVarChar(50), that.name);		
		return request_defered(request, 'proc_addQueueClass');
	}).then(function(data){
		that.id = data.recordset[0][0].ClassId;
		return {status:0};
	},function(err){
		if (err) {
			console.log("executing proc_addQueueClass Error: " + err.message);
			return err;
		}
	});
	return promise;
};
QueueClass.prototype.updateQueueClass = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);
	var that = this;
	
	var promise = conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('id', sql.Int, that.id);	
		request.input('name', sql.NVarChar(50), that.name);		
		return request_defered(request, 'proc_updateQueueClass');
	}).then(function(data){
		return {status:data.ret};
	},function(err){
		if (err) {
			console.log("executing proc_updateQueueClass Error: " + err.message);
			return err;
		}
	});
	return promise;
};

QueueClass.prototype.deleteQueueClass = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);
	var that = this;
	
	var promise = conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('id', sql.Int, that.id);		
		return request_defered(request, 'proc_deleteQueueClass');
	}).then(function(data){
		return {status:data.ret};
	},function(err){
		if (err) {
			console.log("executing proc_deleteQueueClass Error: " + err.message);
			return err;
		}
	});
	return promise;
};





module.exports = QueueClass;