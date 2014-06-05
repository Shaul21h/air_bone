var express = require('express'),
	http = require('http'),
	path = require('path');

var engine = require('./engine.js');



var app = express();




app.get('/:word', function(req, res){
	
	engine.init(req.params.word, function(response){
		response.then(function(data){
			res.send(data);
		});
	});
});


http.createServer(app)
	.listen('4000', function(){
		console.log('Server Started');
	});


