const {Refresh} = require("@models/refresh");

class RefreshService {
  async getToken(refresh_token) {
    // 1st step: check refresh token
    const token = await Refresh.findOne({
      where: {
        refresh_token
      },
      include: "user"
    });

    // 2nd step: return token
    return token;
  }

  async saveToken(user_id, refresh_token) {
    // 1st step: check token
    const token = await Refresh.findOne({
      where: {
        user_id
      }
    });

    // 2nd step: if token exists, update it
    if (token) {
      await token.update({
        refresh_token
      });

      return token;
    }

    // 3rd step: if token does not exist, create it
    const newToken = await Refresh.create({
      user_id,
      refresh_token
    });

    // 4th step: return token

    return newToken;
  }
}

module.exports.RefreshService = new RefreshService();