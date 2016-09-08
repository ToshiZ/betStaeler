var mongoose = require ("mongoose");
var uristring = process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://betUser:943867@ds019966.mlab.com:19966/heroku_267bd0cv';

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