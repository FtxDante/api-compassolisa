const rentalService = require('../service/rentalService');
const { handleErrors } = require('../errors');
class rentalController {
  static async getOneRental(req, res) {
    try {
      const { id } = req.params;
      const result = await rentalService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = rentalController;
