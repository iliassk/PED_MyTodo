/*var jwt = require('jwt-simple');*/
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');
var qs = require('querystring');

var auth = require('./auth.js');
var config = require('../services/config.js');


exports.checkAuthorization = function(req, res, jwt) {
	if (!req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not authorized !'
		});
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, "AGKYW");

	if (!payload.sub) {
		res.status(401).send({
			message: 'Authentication failed'
		});
	}

	return payload.sub;
}

exports.createSendToken = function(data, connection, req, res, jwt) {

	connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
		if (err) {
			console.log(err);
			return res.status(422).send({
				message: 'MYSQL error, check your query!'
			});
		}

		var payload = {
			iss: req.hostname,
			sub: rows[0].id_user,
			exp: moment().add(2, 'days').unix()
		}

		var token = jwt.encode(payload, "AGKYW");


		var data_sent = data;
		delete data_sent.password;

		return res.status(200).send({
			user: data_sent,
			token: token
		});
	});
}

exports.comparePasswords = function(password, passwordDb, callback) {
	bcrypt.compare(password, passwordDb, callback);
}


exports.authGoogle = function(req, res, next, connection, jwt, request) {
	var url = 'https://accounts.google.com/o/oauth2/token';
	var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: config.GOOGLE_SECRET,
		redirect_uri: req.body.redirectUri,
		grant_type: 'authorization_code'
	}

	// post call from node to google
	request.post(url, {
		json: true,
		form: params
	}, function(err, response, token) {
		var accessToken = token.access_token;
		var headers = {
			Authorization: 'Bearer ' + accessToken
		}

		// Get the Google+ profile informations
		request.get({
			url: apiUrl,
			headers: headers,
			json: true
		}, function(err, response, profile) {
			connection.query('SELECT * FROM USERS WHERE googleId = ?', profile.sub, function(err, rows) {
				if (err)
					return next(err);

				if (rows.length == 1) {
					return auth.createSendToken(rows[0], connection, req, res, jwt);
				}

				var data = {
					username: profile.name,
					email: profile.email,
					password: profile.sub, // To add an extra security
					googleId: profile.sub
				};

				//Hash passwords
				bcrypt.genSalt(10, function(err, salt) {
					if (err) return next(err);

					bcrypt.hash(data.password, salt, null, function(err, hash) {
						// Store hash in your password DB.
						if (err) return next(err);

						data.password = hash;

						//insertion 
						connection.query('INSERT INTO USERS SET ?', data, function(err, rows) {
							if (err) {
								console.log(err);
								return next("Mysql error on register, check your query");
							}

							auth.createSendToken(data, connection, req, res, jwt)
						});
					});
				});
			});
		})
	});
}

exports.authFacebook = function(req, res, next, connection, jwt, request) {
	var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
	var graphApiUrl = 'https://graph.facebook.com/me';

	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: config.FACEBOOK_SECRET,
		redirect_uri: req.body.redirectUri
	};

	// get call from node to facebook
	request.get({
		url: accessTokenUrl,
		qs: params //accessToken comes in a querystring format
	}, function(err, response, accessToken) {
		accessToken = qs.parse(accessToken);

		// Get the Facebook profile informations
		request.get({
			url: graphApiUrl,
			qs: accessToken,
			json: true
		}, function(err, response, profile) {
			connection.query('SELECT * FROM USERS WHERE facebookId = ?', profile.id, function(err, rows) {
				if (err)
					return next(err);

				if (rows.length == 1) {
					return auth.createSendToken(rows[0], connection, req, res, jwt);
				}

				var data = {
					username: profile.name,
					email: profile.email,
					password: profile.id, // To add an extra security
					facebookId: profile.id
				};

				//Hash passwords
				bcrypt.genSalt(10, function(err, salt) {
					if (err) return next(err);

					bcrypt.hash(data.password, salt, null, function(err, hash) {
						// Store hash in your password DB.
						if (err) return next(err);

						data.password = hash;

						//insertion 
						connection.query('INSERT INTO USERS SET ?', data, function(err, rows) {
							if (err) {
								console.log(err);
								return next("Mysql error on register, check your query");
							}

							auth.createSendToken(data, connection, req, res, jwt)
						});
					});
				});
			});
		});
	});
}