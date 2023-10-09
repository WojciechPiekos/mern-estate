const customError = (statusCode, message,req,res) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  res.status(statusCode)
  return error;
};

module.exports = {
  customError,
};
