var sql = require('mssql'); 
var customdefer = require('../customdefer');


function Queue(id,name,maxCallTimes, queueClassId,queueClassName,isActive){
    this.id = id;
    this.name = name;
    this.maxCallTimes = maxCallTimes;
    this.queueClassId = queueClassId; 
    this.queueClassName = queueClassName; 
    this.isActive = isActive; 
};
Queue.prototype.getAllQueues = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var promise = customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		return customdefer.request_defered(request, 'proc_getQueueList');
	}).then(function(data){
		var arrQueue = [];
		data.recordset[0].forEach(function(value){
			arrQueue.push((new Queue( value.QueueId,
					value.QueueName,
					value.MaxCallTimes,
					value.QueueClassId,
					value.QueueClassName,
					value.IsActive)));
		});
		return arrQueue;
	},function(err){
		if (err) {
			console.log("executing proc_getQueueList Error: " + err.message);
			return err;
		}
	});
	return promise;
};


Queue.prototype.createNewQueue = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);
	var that = this;
	
	var promise = customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('name', sql.NVarChar(100), that.name);	
		request.input('maxCallTimes', sql.Int, that.maxCallTimes);
		request.input('queueClassId', sql.Int, that.queueClassId);
		request.input('isActive', sql.Int, that.isActive);
		return customdefer.request_defered(request, 'proc_addQueue');
	}).then(function(data){
		that.id = data.recordset[0][0].QueueId;
		return that;
	},function(err){
		if (err) {
			console.log("executing proc_addQueue Error: " + err.message);
			return err;
		}
	});
	return promise;
};
Queue.prototype.updateQueue = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);
	var that = this;
	
	var promise = customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('id', sql.Int, that.id);	
		request.input('name', sql.NVarChar(100), that.name);
		request.input('maxCallTimes', sql.Int, that.maxCallTimes);
		request.input('queueClassId', sql.Int, that.queueClassId);
		request.input('isActive', sql.Int, that.isActive);
		return customdefer.request_defered(request, 'proc_updateQueue');
	}).then(function(data){
		return {status:data.ret};
	},function(err){
		if (err) {
			console.log("executing proc_updateQueue Error: " + err.message);
			return err;
		}
	});
	return promise;
};

Queue.prototype.deleteQueue = function(){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);
	var that = this;
	
	var promise = customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);
		request.input('id', sql.Int, that.id);		
		return customdefer.request_defered(request, 'proc_deleteQueue');
	}).then(function(data){
		return {status:data.ret};
	},function(err){
		if (err) {
			console.log("executing proc_deleteQueue Error: " + err.message);
			return err;
		}
	});
	return promise;
};

Queue.getUserAvilableQueue = function(userid){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var promise = customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('userid', sql.Int, userid);	
		return customdefer.request_defered(request, 'proc_getUserAvilableQueue');
	}).then(function(data){
		var arrWindow = [];
		data.recordset[0].forEach(function(value){
			arrWindow.push(value.QueueId);
		});
		return arrWindow;
	},function(err){
		if (err) {
			console.log("executing proc_getUserAvilableQueue Error: " + err.message);
			return err;
		}
	});
	return promise;
};
Queue.saveUserAvilableQueues = function(userid,arrQueueId){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var promise = customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('UserId', sql.Int, userid);	
		request.input('QueueIds', sql.VarChar(8000), ','+arrQueueId.join(',')+',');
		console.log(','+arrQueueId.join(',')+',')
		return customdefer.request_defered(request, 'proc_saveUserAvilableQueue');
	}).then(function(data){
		if(data.ret != 0){
			console.log("executing proc_saveUserAvilableQueue Error: " + data.recordset[0].errmsg);
		}
		return {status:data.ret};
	},function(err){
		if (err) {
			console.log("executing proc_saveUserAvilableQueue Error: " + err.message);
			return err;
		}
	});
	return promise;
};




module.exports = Queue;