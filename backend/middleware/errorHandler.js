const { APIError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'There was an error, please try again' });
};
  
module.exports = errorHandler;