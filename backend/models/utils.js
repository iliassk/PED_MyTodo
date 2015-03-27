var crypto = require('crypto');

exports.createHash = function(data, salt, callback){
    var hmac = crypto.createHmac("sha1", salt);
    hmac.end(data);

    callback(null, hmac.read().toString('hex'))
}
