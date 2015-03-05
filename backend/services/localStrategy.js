var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var auth = require('../models/auth.js')


var strategyOptionsLogin = {
	usernameField: 'email',
	passReqToCallback: true
};

/*MySql connection*/
var connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "todoManager_db"
});

exports.login = new LocalStrategy(strategyOptionsLogin, function(req, email, password, done) {

	var data = {
		email: email
	};

	connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
		if (err) {
			return done(err);
		}

		if (rows.length !== 1) {
			return done(null, false, {
				message: 'This email is not registered in our database !'
			});
		}

		auth.comparePasswords(password, rows[0].password, function(err, isMatch) {
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				return done(null, false, {
					message: "The password doesn't match !"
				});
			}

			return done(null, rows[0]);
		});

	});
});

var strategyOptionsRegister = {
	usernameField: 'username',
	passReqToCallback: true
};

exports.register = new LocalStrategy(strategyOptionsRegister, function(req, username, password, done) {

	//get data from the request
	var data = {
		username: username,
		email: req.body.email,
		password: password
	};

	//Hash passwords
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return done(err);
		}

		// Store hash in your password DB.
		bcrypt.hash(password, salt, null, function(err, hash) {
			if (err) {
				return done(err);
			}

			data.password = hash;

			//insertion 
			connection.query('INSERT INTO USERS SET ?', data, function(err, rows) {
				if (err) {
					return done(null, false, {
						message: 'Mysql error, check your query !'
					});
				}
				// to return all the info in rows[0]
				connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
					if (err) {
						return done(null, false, {
							message: 'Email not found !'
						});
					}
					return done(null, rows[0]);
				});
			});
		});
	});
});