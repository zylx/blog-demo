const userDb = require("../config/db.ts");

const User = userDb.sequelize.define(
  "user",
  {
    email: {
      type: userDb.DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "email",
    },
    username: {
      type: userDb.DataTypes.STRING,
      allowNull: false,
      field: "username",
    },
    password: {
      type: userDb.DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    avatar: {
      type: userDb.DataTypes.STRING,
      allowNull: true,
      field: "avatar",
    },
  },
  {
    tableName: "user_table",
  }
);

module.exports = User;
