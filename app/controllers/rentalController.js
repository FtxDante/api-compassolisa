const { handleErrors } = require('../errors');
const { rentalPaginateSerializer, rentalSerializer } = require('../serialize/RentalSerializer');
const rentalService = require('../service/rentalService');

class rentalController {
  static async getRental(req, res) {
    try {
      const result = await rentalService.findAll(req, res);
      return res.status(200).json(rentalPaginateSerializer(result));
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = rentalController;
