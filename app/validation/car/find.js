module.exports = async (req, res, next) =>{
  try {
    return next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
