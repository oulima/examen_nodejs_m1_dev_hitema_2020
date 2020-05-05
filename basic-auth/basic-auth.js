const crypto = require('crypto');

function sha1Encode(data) {
    const encoded = data.replace('Basic','');
    return encoded;
}

module.exports.digestAuth = (request, response, next) => {
    const authorization = request.headers.authorization; 
    const encoded = sha1Encode(authorization);
    const decoded = Buffer.from(encoded, crypto).toString("utf8");
    const authentification = decoded.split(':');

    const isValid = authentification[0] === 'node' && authentification[1] === 'password';
    
    isValid ? next() : response.sendStatus(401);
} 
  
