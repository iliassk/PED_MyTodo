var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var jwt = require('jwt-simple');

exports.comparePasswords = function(password, passwordDb, callback){
    bcrypt.compare(password, passwordDb, callback);
}

exports.createSendToken = function(data, connection, req, res) {
	connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
		if (err) {
			console.log(err);
			console.log("titi")
			return res.status(422).send({message: 'MYSQL error, check your query!'});
		}

		var payload = {
			iss: req.hostname,
			sub: rows[0].id_user
		}
		
		var token = jwt.encode(payload, "AGKYW");
		
		
		var data_sent = data;
		delete data_sent.password;

		res.status(200).send({
			user: data_sent,
			token: token
		});
		
	});
}