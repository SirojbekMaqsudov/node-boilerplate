const {ErrorResponse} = require("@utils/ErrorResponse");

module.exports = (err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      ...err
    })
  }

  return res.status(500).json({
    message: err.message || "Internal Server Error",
    error: err,
    status: err.status || 500
  })
}