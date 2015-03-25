var sql = require('mssql'); 
var customdefer = require('../customdefer');
var Q = require('q');

function PersonQueue(option){
    this.queueId = option.queueId || null;
    this.seqVersion = option.seqVersion || null;
    this.seqId = option.seqId || '';
    this.priority = option.priority || 1;
    this.inQueueTime = option.inQueueTime;
    this.lastCallTime = option.lastCallTime;
    this.outQueueTime = option.outQueueTime;
    this.status = option.status;
    this.callTimes = option.callTimes;
    this.callerId = option.callerId;
    this.personId = option.personId;
    this.uniSeqId =  option.uniSeqId;
};

PersonQueue.prototype.pushPersonEnqueue = function(queueId, personId){
	var config = require('../connconfig').queue;
	
	var conn = new sql.Connection(config);

	var defered = Q.defer();
	customdefer.conn_defered(conn).then(function(conn){
		var request = new sql.Request(conn);	
		request.input('QueueId', sql.Int, queueId);	
		request.input('PersonId', sql.Int, personId);	
		return customdefer.request_defered(request, 'proc_enqueue');
	}).then(function(data){
		var personQueue = null;
		var record = data.recordset[0];
		if( record && record.length>0){
			personQueue = new PersonQueue({seqVersion:record.SeqVersion, 
				seqId:record.SeqId, 
				uniSeqId:record.UniSeqId});
		};			
		if (personQueue){
			defered.resolve(personQueue);
		}else{
			defered.reject(new Error('enqueue failed.'));
		}		
	},function(err){ 
		console.log("executing proc_enqueue Error: " + err.message);
		defered.reject(err); 
	});
	return defered.promise;
};

module.exports = PersonQueue;