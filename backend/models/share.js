exports.createHash = function(data, callback){
    bcrypt.genSalt(10, function(err, salt) {
		if (err) callback(err, null)

		bcrypt.hash(data, salt, null, function(err, hash) {
			if (err) callback(err, null)
			callback(null, hash)
		});
    });
}

