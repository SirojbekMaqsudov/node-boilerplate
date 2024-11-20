const {UserService} = require("@services/user");
const {sendResponse} = require("@utils/sendResponse");

class UserController {
  async get(req, res, next) {
    try {
      const data = await UserService.get();
      return sendResponse(res, 200, data);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await UserService.getOne(req.params.id);
      return sendResponse(res, 200, data);
    } catch (e) {
      next(e);
    }
  }

  async getMe(req, res, next) {
    try {
      const data = await UserService.getMe(req.user.id);
      return sendResponse(res, 200, data);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const data = await UserService.create(req.body);
      return sendResponse(res, 201, data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const data = await UserService.update(req.params.id, req.body, req);
      return sendResponse(res, 200, data);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      await UserService.delete(req.params.id);
      return sendResponse(res, 204, {});
    } catch (e) {
      next(e);
    }
  }
}

module.exports.UserController = new UserController();