var PORT 		= 4711
var express 	= require('express'),
    path 		= require('path'),
	bodyParser  = require('body-parser')
var app 		= express()
var client_path = path.join(__dirname ,'../client/')

// Configure server
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(client_path))


app.listen(PORT, function() {
	console.log('Express server listening on port %d in %s mode', PORT, app.settings.env);
    console.log('application_root is %s', client_path);
})

