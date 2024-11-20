class UserDTO {
  constructor(user) {
    this.full_name = user.full_name;
    this.phone_number = user.phone_number;
    this.password = user.password;
  }
}

module.exports = {UserDTO};