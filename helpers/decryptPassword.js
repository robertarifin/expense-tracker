const bcrypt = require('bcrypt');

function decryptPassword(password, encrypted) {
    const decrypted = bcrypt.compareSync(password, encrypted);
    return decrypted;
}

module.exports = decryptPassword