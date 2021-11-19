require('dotenv').config();
const jwtService = require('jsonwebtoken');
const {InvalidToken, handleErrors} = require('../../errors')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).send({ message: 'token not provided' });

    jwtService.verify(token, process.env.SECRET, (err, userInfo) => {
      if (err) {
        throw new InvalidToken();
      } else {
        req.userToken = userInfo;
      }
    });
    return next();
  } catch (error) {
    const status = handleErrors.getStatusToError(error);
    return res.status(status).json(error);
  }
};
