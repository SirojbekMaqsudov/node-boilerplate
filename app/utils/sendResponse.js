function sendResponse(res, status, data, other) {
  return res.status(status).json({
    status,
    data,
    ...other
  });
}

module.exports = {sendResponse};