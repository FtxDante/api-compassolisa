const { handleErrors } = require('../errors');
const { rentalSerializer } = require('../serialize/RentalSerializer');
const rentalService = require('../service/rentalService');

class rentalController {
  static async getOneRental(req, res) {
    try {
      const { id } = req.params;
      const result = await rentalService.findById(id);
      return res.status(200).json(rentalSerializer(result));
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }
}

module.exports = rentalController;
