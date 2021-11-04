const { handleErrors } = require('../errors');
/* eslint-disable require-jsdoc */
const rentalService = require('../service/rentalService');

class RentalController {
  static async createRental(req, res) {
    try {
      const result = await rentalService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = RentalController;
