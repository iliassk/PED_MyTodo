exports.addgroup_post = function(req, res, next, connection, auth){
	//get data from the request
	console.log(req.body.name);
	var data = {
		name: req.body.name
	};

	connection.query('INSERT INTO GROUPS SET ?', data, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			console.log("reussi");
		res.sendStatus(200);
		}
	});
}


exports.listgroupe_get = function(req, res, next, connection, auth){
   // retourne le non et le nombre de votre
   	
	connection.query('SELECT * FROM GROUPS',function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			//console.info(rows);
			res.status(200).json(rows);
		}
	});
}