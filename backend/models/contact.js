exports.listgroupe_get = function(req, res, next, connection, auth){
   // retourne le non et le nombre de votre
   	console.log("toto 2");
	connection.query('SELECT * FROM GROUPS',function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			//console.info(rows);
			console.log("toto");
			res.status(200).json(rows);
		}
	});
}