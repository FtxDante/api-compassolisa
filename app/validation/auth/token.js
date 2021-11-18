require('dotenv').config();
const jwtService = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).send({ message: 'token not provided' });

    jwtService.verify(token, process.env.SECRET, (err, userInfo) => {
      if (err) {
        res.status(403).send({ message: 'invalid token' });
      } else {
        req.userToken = userInfo;
      }
    });
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
