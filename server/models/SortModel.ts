const sortDb = require("../config/db.ts");

const Sort = sortDb.sequelize.define(
  "sort",
  {
    sort_id: {
      type: sortDb.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "sort_id",
    },
    sort: {
      type: sortDb.DataTypes.STRING,
      allowNull: false,
      field: "sort",
    },
  },
  {
    timestamps: false,
    tableName: "sort_table",
  }
);

module.exports = Sort;
