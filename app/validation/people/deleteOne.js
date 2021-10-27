const mongoose = require('mongoose');


module.exports = async (req, res, next) =>{
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValid) {
      throw new Error('Invalid id');
    }
    return next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
