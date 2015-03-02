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