const RentalRepository = require('../repository/rentalRepository');
const { NotFound, UserRegistered } = require('../errors');

class RentalServices {
  async findById(id) {
    const rental = await RentalRepository.findById(id);
    if (!rental) {
      throw new NotFound('id');
    }
    return rental;
  }

  async updateOneRental(req) {
    const { id } = req.params;
    await this.findById(id);
    const updatedRental = await RentalRepository.updateOne(req);
    return updatedRental;
  }
}

module.exports = new RentalServices();
