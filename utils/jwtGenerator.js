const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = userId => {
    const payload = {
        user: {
          id: userId
        }
      };

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1hr'});
}

module.exports = jwtGenerator;