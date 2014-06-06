var express = require('express'),
	http = require('http'),
	path = require('path');

var engine = require('./engine.js');
var io = require('socket.io')(http);


var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});



app.all('/:word', function(req, res){

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


