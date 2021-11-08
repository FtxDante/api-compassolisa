const rentalService = require('../service/rentalService');

class rentalController {
  static async teste(req, res) {
    res.status(418).send('Its Working');
    rentalService.teste();
  }
}
module.exports = rentalController;
