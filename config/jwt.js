const jwt = require('jsonwebtoken');

const JWT_SECRET = 'akash'; 

module.exports = {
    JWT_SECRET,
    generateToken: (userId) => {
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
    },
    verifyToken: (token) => {
        return jwt.verify(token, JWT_SECRET);
    }
};


