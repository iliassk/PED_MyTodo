var moment = require('moment');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');

exports.checkAuthorization = function(req, res, jwt){
    if (!req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not authorized !'
		});
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, "AGKYW");
	
	if(!payload.sub){
	    res.status(401).send({
	        message: 'Authentication failed'
	    });
	}

	return payload.sub;
}


exports.createSendToken = function(data, req, res) {

	var expires = moment().add(2, 'days').valueOf();

	var payload = {
		iss: req.hostname,
		sub: req.user.id_user,
		exp: expires
	}

	var token = jwt.encode(payload, "AGKYW");

	var data_sent = data;
	delete data_sent.password;

	res.status(200).send({
		user: data_sent,
		token: token
	});
}

exports.comparePasswords = function(password, passwordDb, callback){
    bcrypt.compare(password, passwordDb, callback);
}
