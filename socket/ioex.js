var QueueClass = require('../models/queue/queueclass'); 
var Queue = require('../models/queue/queue'); 
var Person = require('../models/queue/person'); 
var Q = require('q');

var ioex = function(io){
	io.on('connection',function(socket){
		console.log('a user connect')
		socket.emit('news', {hello:'world'});
		socket.on('join-room', function(room, fn){
			socket.rooms.forEach(function(val){
				console.log('leaveing:'+val);
				socket.leave(val);
			});
			socket.join(room);
			fn({status:0, message:'joined room-'+room});
		});
		//叫号
		socket.on('fetch-num', function(data, fn){			
			var queueId = data.queueId;
			var externalPersonId = data.externalPersonId;
			var queue = new Queue();
			queue.init(queueId)
				.then(function(queue){
//					socket.emit('fetch-num-result',
//							{status:0, seqId:personqueue.seqId, queueId:queueId, externalPersonId:externalPersonId});
					return queue.enqueue(externalPersonId);
				})
				.then(null,function(err){
					socket.emit('fetch-num-result',
							{status:1, seqId:personqueue.seqId, queueId:queueId, externalPersonId:externalPersonId});
				});	 
			 
		});
		socket.on('disconnect', function(){
			console.log('user disconnecte.');
		});
	});	
};

module.exports = ioex;