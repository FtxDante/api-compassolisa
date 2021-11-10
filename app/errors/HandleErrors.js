class HandleErrors {
  getStatusToError(error) {
    let status = 500;
    if (error.description === 'BadRequest' || error.idError === '003' || error.idError === '005') {
      status = 400;
    } else if (error.description === 'Unauthorized') {
      status = 401;
    } else if (error.description === 'NotFound') {
      status = 404;
    }
    if (error.description === 'Conflict') {
      status = 409;
    }
    return status;
  }
}

module.exports = new HandleErrors();
