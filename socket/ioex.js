var ioex = function(io){
	io.on('connection',function(socket){
		console.log('a user connect')
		socket.emit('news', {hello:'world'});
		socket.on('myownevent', function(data){
			console.log(data);
		});
		socket.on('disconnect', function(){
			console.log('user disconnecte.');
		});
	});	
};

module.exports = ioex;