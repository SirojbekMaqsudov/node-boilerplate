const {sequelize} = require("@server/db");
const {DataTypes} = require("sequelize");
const {User} = require("@models/user");

const Refresh = sequelize.define("refresh_tokens", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

User.hasMany(Refresh, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "refresh_tokens"
});

Refresh.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user"
})


module.exports = {Refresh};