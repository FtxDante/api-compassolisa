const { handleErrors } = require('../errors');
const { rentalSerializer, rentalPaginateSerializer } = require('../serialize/RentalSerializer');
const rentalService = require('../service/rentalService');

class RentalController {
  static async getRental(req, res) {
    const result = await rentalService.findAll(req, res);
    return res.status(200).json(rentalPaginateSerializer(result));
  }

  static async createRental(req, res) {
    try {
      const result = await rentalService.create(req);
      return res.status(201).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }

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

  static async updateOneRental(req, res) {
    try {
      const result = await rentalService.updateOneRental(req);
      return res.status(200).json(rentalSerializer(result));
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }

  static async deleteOneRental(req, res) {
    const { id } = req.params;

    try {
      await rentalService.deleteOneRental(id);

      return res.status(204).end();
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }
}

module.exports = RentalController;
