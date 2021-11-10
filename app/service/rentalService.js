const RentalRepository = require('../repository/rentalRepository');
const { NotFound } = require('../errors');

class RentalServices {
  async findById(id) {
    const rental = await RentalRepository.findById(id);
    if (!rental) {
      throw new NotFound('id');
    }
    return rental;
  }
}

module.exports = new RentalServices();
