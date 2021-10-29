const mongoose = require('mongoose');
const {InvalidId} = require('../../errors');

module.exports = async (req, res, next) =>{
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValid) {
      throw new InvalidId();
    }
    return next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
