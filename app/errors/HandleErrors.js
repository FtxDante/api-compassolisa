class HandleErrors {
  getStatusToError(error) {
    let status = 500;
    if (error.idError === '001' || error.idError === '003') {
      status = 400;
    } else if (error.idError === '004') {
      status = 401;
    } else if (error.idError === '002') {
      status = 404;
    }
    return status;
  }
}

module.exports = new HandleErrors();
