'use strict';

var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var config = require('./config.js');

var model = {
	// Enpoint url that will verify the email
	verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
	title: 'ToDoManager',
	subTitle: 'Thank you for choosing ToDoManager !',
	body: 'Please verify your email address by clicking this link : '
};


// Email sending functionality
exports.sendEmail = function(email, res) {
	var payload = {
		sub: email
	};

	// The token will be placed in the verify link of the email template
	var token = jwt.encode(payload, config.EMAIL_SECRET);

	var transporter = nodemailer.createTransport(smtpTransport({
		host: 'smtp.mailgun.org',
		secure: true,
		auth: {
			user: config.SMTP_LOGIN,
			pass: config.SMTP_PASS
		}
	}));

	var mailOptions = {
		from: 'Accounts < ' + config.SMTP_LOGIN_SENDER + ' >',
		to: email,
		subject: 'ToDoManager Account Verification',
		html: getHtml(token)
	};

	transporter.sendMail(mailOptions, function(err, info) {
		if (err) return res.status(500, err);

		console.log('email sent ', info.response);
	});
};

// Handles the endpoint request
exports.handler = function(req, res, connection) {
	var token = req.query.token;

	var payload = jwt.decode(token, config.EMAIL_SECRET);
	var email = payload.sub;

	if (!email) return handleError(res);

	connection.query('SELECT * FROM USERS WHERE email = ?', email, function(err, rows) {
		if (err) {
			return res.status(500);
		}

		if (rows.length !== 1) {
			return handleError(res);
		}

		if (!rows[0].active) {
			connection.query('UPDATE USERS SET active = ? WHERE email = ?', [1, email], function(err, result) {
				if (err) res.status(500);

				return res.redirect(config.APP_URL);
			});
		} else {
			return res.status(401).send({
				message: 'Your account is already activated !'
			});
		}


	});
};

function handleError(res) {
	return res.status(401).send({
		message: 'Authentication failed, unable to verify the email'
	});
}

// Angular familiar templating
_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

// Gets the finalized template with the dynamic data inside it
function getHtml(token) {
	var path = './views/emailTemplate.html';
	var html = fs.readFileSync(path, 'utf8');

	// Hold the template as provided by underscore
	var template = _.template(html);

	model.verifyUrl += token;
	// The model is injected into the template
	return template(model);
}