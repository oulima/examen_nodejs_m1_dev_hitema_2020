/* const crypto = require('crypto');

function sha1Encode(data) {
    const encoded = data.replace('Basic','');
    return encoded;
}

module.exports.digestAuth = (request, response, next) => {
    const encoded = sha1Encode(authorization);
    const authorization = request.headers.authorization; 
    const authentification = decoded.split(':');
    const decoded = Buffer.from(encoded, crypto).toString("utf8");

    const isValid = authentification[0] === 'node' && authentification[1] === 'password';
    
    isValid ? next() : response.sendStatus(401);
}  */
  
const crypto = require('crypto');

function sha1Encode(data) {
    return crypto.createHash('sha1').update(data).digest('hex')
}

module.exports.digestAuth = (request, response, next) => {
    const authorization = request.headers.authorization;
    const encoded = authorization.replace('Basic ', '');
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const authentication = decoded.split(':');

    const isValid = authentication[0] === 'node'
        && authentication[1] === sha1Encode('password');

    isValid ? next() : response.sendStatus(401);
}