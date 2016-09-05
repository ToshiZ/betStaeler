var querystring = require("querystring"),
	fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "jsonp"});
  fs.readFile("./tmp/test.txt", (error, file) => {
  	if(error) {
		response.writeHead(500, {"Content-Type": "jsonp"});
		response.write(error + "\n");
		response.end();
    } else {
    	let jsonFile = JSON.parse(file);
    	if(typeof jsonFile['newData'] != 'object') jsonFile['newData'] = [];
    	//jsonFile['newData'].push(querystring.parse(postData).text);
    	//jsonFile['newData'].push(JSON.parse(postData));
    	jsonFile['newData'].push(postData);
    	fs.writeFile('./tmp/test.txt', JSON.stringify(jsonFile), (err) => {
    		if (err) throw err;
  			console.log('It\'s saved!');
    	});
	  	response.write(JSON.stringify(jsonFile));
	  	response.end();
	}
  });
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.txt", (error, file) => {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(file, "text");
      response.end();
    }
  });
}


exports.start = start;
exports.upload = upload;
exports.show = show;