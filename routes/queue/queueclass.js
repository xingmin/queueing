var express = require('express');
var router = express.Router();
var QueueClass = require("../../models/queue/queueclass.js");
var Q = require('q');
var ResData = require("../resdata.js");


router.post('/create', function(req, res) {	
	var name = req.body.classname;	
	var queueclass = new QueueClass(name);
	queueclass.createNewQueueClass()
		.then(function(status){
			var resdata;		
			if(status instanceof Error){
				resdata = new ResData(status, status.message);
			}else{
				resdata = new ResData(status, '', queueclass);
			}
			res.setHeader('Content-Type','application/json;charset=utf-8');
			res.send(JSON.stringify(resdata));		
		});
});

router.post('/update', function(req, res) {	
	var name = req.body.classname;	
	var id = req.body.classid;	 
	var queueclass = new QueueClass(name, id);
	queueclass.updateQueueClass()
		.then(function(status){
			var resdata;		
			if(status instanceof Error){
				resdata = new ResData(status, status.message);
			}else{
				resdata = new ResData(status, '', queueclass);
			}
			res.setHeader('Content-Type','application/json;charset=utf-8');
			res.send(JSON.stringify(resdata));		
		});
});

router.post('/delete', function(req, res) {	
	var id = req.body.classid;	 
	var queueclass = new QueueClass('', id);
	queueclass.deleteQueueClass()
		.then(function(status){
			var resdata;		
			if(status instanceof Error){
				resdata = new ResData(status.status, status.message);
			}else{
				resdata = new ResData(status.status);
			}
			res.setHeader('Content-Type','application/json;charset=utf-8');
			res.send(JSON.stringify(resdata));		
		});
});
router.get('/', function(req, res) {	
	QueueClass.prototype.getAllQueueClass()
		.then(function(status){
			var resdata;		
			if(status instanceof Error){
				resdata = new ResData(status.status, status.message);
			}else{
				resdata = new ResData(0,'',);
			}
			res.setHeader('Content-Type','application/json;charset=utf-8');
			res.send(JSON.stringify(resdata));		
		});
});
module.exports = router;
