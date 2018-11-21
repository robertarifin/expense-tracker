const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

function encryptPassword(password) {
    const encrypted = bcrypt.hashSync(password, salt);
    return encrypted;
}

module.exports = encryptPassword