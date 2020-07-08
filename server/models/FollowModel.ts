const followDb = require("../config/db.ts");

const Follow = followDb.sequelize.define(
  "follow",
  {
    user_email: {
      type: followDb.DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "user_email",
    },
    follow_email: {
      type: followDb.DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "follow_email",
    },
    status: {
      type: followDb.DataTypes.INTEGER,
      allowNull: false,
      field: "status",
    },
  },
  {
    tableName: "follow_table",
  }
);

module.exports = Follow;
