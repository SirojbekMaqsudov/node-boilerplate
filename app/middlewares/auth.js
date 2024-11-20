const jwt = require("jsonwebtoken");
const {Config} = require("@config/index");

const AuthMiddleware = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized'
    });
  }
  try {
    const user = jwt.verify(token, Config.app.JWT_ACCESS_SECRET);
    req.user = user;

    next()
  } catch (e) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
      error: e
    });
  }
}

module.exports = {AuthMiddleware};