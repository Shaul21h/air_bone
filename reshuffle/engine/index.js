var wa = require('.././wolfarm-alpha');


module.exports.init = function(callback){

	wa.createClient('YQ552E-RLQRKXP5LU',{})

	wa.query('hi how are you', function(err, response){

		console.log(response);
	})

};