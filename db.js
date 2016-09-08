var mongoose = require ("mongoose");
//console.log('1111111111111111111');
//console.log(MONGODB_URI);
var uristring = process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/HelloMongoose';

mongoose.connect(uristring, function (err, res) {
	if (err) { 
		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + uristring);
		}
	});

var betSchema = new mongoose.Schema({
	data: {
		type: String		
	}
});
var lpSchema = new mongoose.Schema({
	lp: {
		type: String		
	}
});

var Bets = mongoose.model('PowerBets', betSchema);
var LPs = mongoose.model('PowerLPs', lpSchema);

exports.Bets = Bets;
exports.LPs = LPs;