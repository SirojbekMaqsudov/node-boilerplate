const {User} = require("@models/user");
const {ErrorResponse} = require("@utils/ErrorResponse");
const {Config} = require("@server/config");
const bcrypt = require("bcrypt");
const {userValidate} = require("@validations/user");
const {UserDTO} = require("@app/dtos/userDTO");
const {ROLE} = require("@utils/consts");

class UserService {
  async get() {
    // 1st step: get all users
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"]
      }
    });
    // 2nd step: return users
    return users;
  }

  async getOne(id) {
    // 1st step: check user exists
    const user = await User.findByPk(id);

    // 2nd step: if user does not exist, throw an error
    if (!user) {
      throw ErrorResponse.notFound("Foydalanuvchi topilmadi!");
    }

    // 3rd step: return user
    return user;
  }

  async getMe(id) {
    // 1st step: check user exists
    const user = await User.findByPk(id);

    // 2nd step: if user does not exist, throw an error
    if (!user) {
      throw ErrorResponse.notFound("Foydalanuvchi topilmadi!");
    }

    // 3rd step: return user
    return user;
  }

  async create(data) {
    // 1st step: validate data
    const error = userValidate(data);
    if (error) {
      throw ErrorResponse.validation(error.message, error.errors);
    }

    // 2nd step: check phone number exists
    const checkPhoneNumber = await User.findOne({
      where: {
        phone_number: data.phone_number
      }
    });
    if (checkPhoneNumber) {
      const message = "Telefon raqam mavjud!";
      throw ErrorResponse.validation(message, {
        phone_number: message
      });
    }

    // 3rd step: hash password
    const salt = await bcrypt.genSalt(parseInt(Config.app.BCRYPT_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    // 4th step: create a dto
    const userDTO = new UserDTO(data);
    // 5th step: create a user
    const user = await User.create(userDTO);
    // 6th step: return user
    return user;
  }

  async update(id, data, req) {
    //1st step: check id is number
    if (isNaN(id)) {
      throw ErrorResponse.validation("Id son bo'lishi kerak!", {});
    }

    // 2nd step: check user exists
    const user = await User.findByPk(id);
    if (!user) {
      throw ErrorResponse.notFound("Foydalanuvchi topilmadi!");
    }
    // 3rd step: validate data
    const error = userValidate(data, true);
    if (error) {
      throw ErrorResponse.validation(error.message, error.errors);
    }

    //4th step: check req.user.id is equals to id or req.user.role is admin
    if (req.user.id !== id && req.user.role !== ROLE.ADMIN) {
      throw ErrorResponse.forbidden("Sizga ruxsat yo'q!");
    }

    // 5th step: check if data.role has value and req.user.role is not admin
    if (data.role && req.user.role !== ROLE.ADMIN) {
      throw ErrorResponse.forbidden("Sizga ruxsat yo'q!");
    }

    // 6th step: check if phone number is unique (if updating phone number)
    if (data.phone_number && data.phone_number !== user.phone_number) {
      const checkPhoneNumber = await User.findOne({
        where: {
          phone_number: data.phone_number
        }
      });
      if (checkPhoneNumber) {
        const message = "Telefon raqam mavjud!";
        throw ErrorResponse.validation(message, {
          phone_number: message
        });
      }
    }

    // 7th step: hash password if it's being updated
    if (data.password) {
      const salt = await bcrypt.genSalt(parseInt(Config.app.BCRYPT_SALT_ROUNDS));
      data.password = await bcrypt.hash(data.password, salt);
    }

    // 8th step: update user
    await user.update(data);

    // 9th step: return user
    return user;
  }

  async delete(id) {
    // 1st step: check user exists
    const user = await User.findByPk(id);
    if (!user) {
      throw ErrorResponse.notFound("Foydalanuvchi topilmadi!");
    }

    // 2nd step: delete user
    await user.destroy();
  }
}

module.exports.UserService = new UserService();