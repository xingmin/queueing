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

function QueueClass(id, name, mode){
    this.id = id;
    this.name = name;
    this.mode = mode;
};
QueueClass.prototype.getAllQueueClass = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var promise = conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		return request_defered(request, 'proc_getQueueClassList');
	}).then(function(data){
		var arrQueueClass = [];
		data.recordset[0].forEach(function(value){
			arrQueueClass.push((new QueueClass(value.Id, value.Name, value.Mode)));
		});
		return arrQueueClass;
	},function(err){
		if (err) {
			console.log("executing proc_addQueueClass Error: " + err.message);
			return err;
		}
	});
	return promise;
};
QueueClass.prototype.getQueueClassByPinyin = function(py){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var promise = conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('pinyin', sql.VarChar(100), py);	
		return request_defered(request, 'proc_getQueueClassByPinyin');
	}).then(function(data){
		var arrQueueClass = [];
		data.recordset[0].forEach(function(value){
			arrQueueClass.push((new QueueClass(value.Id, value.Name, value.Mode)));
		});
		return arrQueueClass;
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
		request.input('mode', sql.Int, that.mode);	
		return request_defered(request, 'proc_addQueueClass');
	}).then(function(data){
		that.id = data.recordset[0][0].ClassId;
		return that;
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
		request.input('mode', sql.Int, that.mode);
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