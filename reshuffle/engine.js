var wa = require('wolfram');

var q = require('q');

var google = require('google');


var fetchfromgoogle = function(word){

	var google = require('google');

	google.resultsPerPage = 25;
	var nextCounter = 0;

	google('word', function(err, next, links){
	  if (err) console.error(err);

	  for (var i = 0; i < links.length; ++i) {
	    console.log(links[i].title + ' - ' + links[i].link); //link.href is an alias for link.link
	    console.log(links[i].description + "\n");
	  }

	  if (nextCounter < 4) {
	    nextCounter += 1;
	    if (next) next();
	  }

	});

}


module.exports.init = function(stringword, callback){

	var engine = wa.createClient('YQ552E-RLQRKXP5LU');

	var defer = q.defer();

	engine.query(stringword, function(err, response){
		if (err) {
			defer.reject({message: 'failed'});
		}
		else{
			
			if(response.length < 1){
				//fetchfromgoogle(stringword)
			}
			else{
				console.log(response[1].subpods[0].value)
				defer.resolve(response[1].subpods[0].value.replace(/wolfram\|alpha/ig, "Pearson one air").replace(/stephen.*/ig, "Team Ninjas").replace(/^\d\s[years].*/ig, "Just a day old baby") || "Im not ready to answer this question.");
			}	
		}
	});

	callback(defer.promise);
};