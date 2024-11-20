const RoleMiddleware = (roles) => {
  return (req, res, next) => {
    const {role} = req.user;
    if (!roles.includes(role)) {
      return res.status(403).json({
        status: 403,
        message: 'Sizda bunday huquq yo\'q'
      });
    }

    next();
  }
}

module.exports = {RoleMiddleware};