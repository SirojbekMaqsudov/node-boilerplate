const {sendResponse} = require("@utils/sendResponse");
const {AuthService} = require("@services/auth");

class AuthController {
  async login (req, res, next) {
    try {
      const data = await AuthService.login(req.body);
      return sendResponse(res, 200, data);
    } catch (e) {
      next(e);
    }
  }

  async refresh (req, res, next) {
    try {
      const data = await AuthService.refresh(req.body.refresh_token);
      return sendResponse(res, 200, data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports.AuthController = new AuthController();