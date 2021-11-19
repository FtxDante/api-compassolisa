class HandleErrors {
  getStatusToError(error) {
    let status = 500;
    if (error.description === 'Unauthorized') {
      status = 401;
    } else if (error.description === 'NotFound') {
      status = 404;
    } else if (error.description === 'Conflict') {
      status = 409;
    } else if (error.description === 'Forbidden') {
      status = 403;
    }
    return status;
  }
}

module.exports = new HandleErrors();
