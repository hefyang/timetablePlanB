const expressJwt = require('express-jwt');
const fs = require("fs");
const path = require('path');

const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../server_env/public.key'));

exports.checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY
});