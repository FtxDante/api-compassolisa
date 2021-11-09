class HandleErrors {
  getStatusToError(error) {
    let status = 500;
    if (error.description === 'Conflict' || error.idError === '003' || error.idError === '005') {
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
