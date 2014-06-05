var express = require('express'),
	http = require('http'),
	path = require('path');

var engine = require('./engine.js');



var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});



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


