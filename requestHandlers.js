var querystring = require("querystring"),
	fs = require("fs"),
	db = require("./db");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  let body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<h1>wat??</h1>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
/*  fs.readFile("./tmp/test.txt", (error, file) => {
  	if(error) {
		response.writeHead(500, {"Content-Type": "text/plain"});
		response.write(error + "\n");
		response.end();
    } else {
    	let jsonFile = JSON.parse(file);
    	if(typeof jsonFile['newData'] != 'object') jsonFile['newData'] = [];
    	//jsonFile['newData'].push(querystring.parse(postData).text);
    	console.log(`data: ${postData}`);
    	jsonFile['newData'].push(JSON.parse(postData));
    	//jsonFile['newData'].push(postData);
    	fs.writeFile('./tmp/test.txt', JSON.stringify(jsonFile), (err) => {
    		if (err) throw err;
  			console.log('It\'s saved!');
    	});
	  	response.write(JSON.stringify(jsonFile));
	  	response.end();
	}
  });*/
  	let newData = new db.Bets ({data: postData});
  	newData.save((error) => {
  		if (error) {
  			console.log ('Error on save!')
  		} else {
  			console.log ('bet saved');
  			db.Bets.find({}).exec((error, result) => {
				if(error){
					response.writeHead(500, {"Content-Type": "text/plain"});
					response.write(error + "\n");
					response.end();
				} else {
					response.write(JSON.stringify(result));
	  				response.end();
				}	
			});
  		}
  	});	
}

function upload2(response, postData) {
  console.log("Request handler 'upload2' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  /*fs.readFile("./tmp/test.txt", (error, file) => {
  	if(error) {
		response.writeHead(500, {"Content-Type": "text/plain"});
		response.write(error + "\n");
		response.end();
    } else {
    	let jsonFile = JSON.parse(file);
    	if(typeof jsonFile['lps'] != 'object') jsonFile['lps'] = [];
    	//jsonFile['newData'].push(querystring.parse(postData).text);
    	console.log(`data2: ${postData}`);
    	jsonFile['lps'].push(JSON.parse(postData));
    	//jsonFile['newData'].push(postData);
    	fs.writeFile('./tmp/test.txt', JSON.stringify(jsonFile), (err) => {
    		if (err) throw err;
  			console.log('It\'s saved!');
    	});
	  	response.write(JSON.stringify(jsonFile));
	  	response.end();
	}
  });*/
  let newData = new db.LPs ({lp: postData});
  	newData.save((error) => {
  		if (error) {
  			console.log ('Error on save!')
  		} else {
  			console.log ('lps saved');
  			db.LPs.find({}).exec((error, result) => {
				if(error){
					response.writeHead(500, {"Content-Type": "text/plain"});
					response.write(error + "\n");
					response.end();
				} else {
					response.write(JSON.stringify(result));
	  				response.end();
				}	
			});
  		}
  	});	
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
/*  fs.readFile("./tmp/test.txt", (error, file) => {
    if(error) {
		response.writeHead(500, {"Content-Type": "text/plain"});
		response.write(error + "\n");
		response.end();
    } else {
  //   	let fileStream = fs.createWriteStream("./tmp/test.txt");
		// let request = http.get("http://tmp/test.txt", function(response) {
		// 	response.pipe(fileStream);
		// });
	    let body = '<html>'+
		    '<head>'+
		    '<meta http-equiv="Content-Type" content="text/html; '+
		    'charset=UTF-8" />'+
		    '</head>'+
		    '<body>'+
		    file +
		    '</body>'+
		    '</html>';
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
    }
  });*/
	db.LPs.find({}).exec((error, result) => {
		if(error){
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			//console.log(`res1: ${result}`)
			db.Bets.find({}).exec((error, result2) => {
				if(error){
					response.writeHead(500, {"Content-Type": "text/plain"});
					response.write(error + "\n");
					response.end();
				} else {
					//console.log(`res2: ${result2}`)

					let body = '<html>'+
					    '<head>'+
					    '<meta http-equiv="Content-Type" content="text/html; '+
					    'charset=UTF-8" />'+
					    '</head>'+
					    '<body>'+
					    '<p>' +
					    JSON.stringify(result) +
					    '</p>' +
					    '<p>' + 
					    JSON.stringify(result2) +
					    '</p>' +
					    '</body>'+
					    '</html>';
					response.write(body);
	  				response.end();
				}	
			});			
		}	
	});

}


exports.start = start;
exports.upload = upload;
exports.upload2 = upload2;
exports.show = show;