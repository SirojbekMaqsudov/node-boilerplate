const {authValidate} = require("@validations/auth");
const {ErrorResponse} = require("@utils/ErrorResponse");
const {User} = require("@models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const {Config} = require("@config/index");
const {RefreshService} = require("@services/refresh");

class AuthService {
  async login(data) {
    // 1st step: check validation
    const error = authValidate(data);
    if (error) {
      throw ErrorResponse.validation(error.message, error.errors);
    }
    // 2nd step: check user in database
    const user = await User.findOne({
      where: {
        phone_number: data.phone_number
      }
    })
    if (!user) {
      throw ErrorResponse.validation('Foydalanuvchi mavjud emas', {
        phone_number: 'Bunday telefon raqamli foydalanuvchi mavjud emas'
      });
    }
    // 3rd step: check password
    const compare = await bcrypt.compare(data.password, user.password);
    if (!compare) {
      throw ErrorResponse.validation('Parol xato', {
        password: 'Parol xato kiritildi'
      });
    }

    // 4th step: generate token
    const userObject = _.pick(user, ['id', 'full_name', 'phone_number', 'role']);
    const access_token = jwt.sign(userObject, Config.app.JWT_ACCESS_SECRET, {expiresIn: Config.app.JWT_ACCESS_EXPIRATION});
    const refresh_token = jwt.sign(userObject, Config.app.JWT_REFRESH_SECRET, {expiresIn: Config.app.JWT_REFRESH_EXPIRATION});

    // 5th step: save refresh token
    await RefreshService.saveToken(user.id, refresh_token);

    // 6th step: return tokens
    return {
      access_token,
      refresh_token,
      user: userObject
    }
  }

  async refresh(token) {
    // 1st step: check token
    if (!token) {
      throw ErrorResponse.unauthorized();
    }

    // 2nd step: verify token
    try {
      jwt.verify(token, Config.app.JWT_REFRESH_SECRET);
    } catch (e) {
      throw ErrorResponse.unauthorized();
    }

    // 3rd step: check refresh token
    const candidate = await RefreshService.getToken(token);
    if (!candidate) {
      throw ErrorResponse.unauthorized();
    }
    // 4th step: generate new access token
    const userObject = _.pick(candidate.user, ['id', 'full_name', 'phone_number', 'role']);
    const access_token = jwt.sign(userObject, Config.app.JWT_ACCESS_SECRET, {expiresIn: Config.app.JWT_ACCESS_EXPIRATION});
    const refresh_token = jwt.sign(userObject, Config.app.JWT_REFRESH_SECRET, {expiresIn: Config.app.JWT_REFRESH_EXPIRATION});

    // 5th step: save refresh token
    await RefreshService.saveToken(candidate.user.id, refresh_token);

    // 6th step: return tokens

    return {
      access_token,
      refresh_token,
      user: userObject
    }
  }
}

module.exports.AuthService = new AuthService();