var sql = require('mssql'); 
var customdefer = require('../customdefer');


function QueueClass(id, name, mode, py){
    this.id = id;
    this.name = name;
    this.mode = mode;
    this.pinyin = py;
};
QueueClass.prototype.getAllQueueClass = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var promise =  customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		return customdefer.request_defered(request, 'proc_getQueueClassList');
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

	var promise =  customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('pinyin', sql.VarChar(100), py);	
		return customdefer.request_defered(request, 'proc_getQueueClassByPinyin');
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
	
	var promise =  customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('name', sql.NVarChar(50), that.name);	
		request.input('mode', sql.Int, that.mode);	
		return customdefer.request_defered(request, 'proc_addQueueClass');
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
	
	var promise =  customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('id', sql.Int, that.id);	
		request.input('name', sql.NVarChar(50), that.name);		
		request.input('mode', sql.Int, that.mode);
		return customdefer.request_defered(request, 'proc_updateQueueClass');
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
	
	var promise =  customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('id', sql.Int, that.id);		
		return customdefer.request_defered(request, 'proc_deleteQueueClass');
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

QueueClass.prototype.getQueueClassByQueueId = function(queueId){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var promise =  customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('QueueId', sql.Int, queueId);	
		return customdefer.request_defered(request, 'proc_getQueueClassByQueueId');
	}).then(function(data){
		var queueClass;
		var record = data.recordset[0];
		if( record && record.length>0){
			queueClass = new QueueClass(record.Id, record.Name, record.Mode, record.Pinyin)
		};	
		return queueClass;
	},function(err){
		if (err) {
			console.log("executing proc_getQueueClassByQueueId Error: " + err.message);
			return err;
		}
	});
	return promise;
};



module.exports = QueueClass;