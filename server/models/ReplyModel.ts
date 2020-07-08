const replyDb = require("../config/db.ts");

const Reply = replyDb.sequelize.define(
  "reply",
  {
    reply_id: {
      type: replyDb.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "reply_id",
    },
    comment_id: {
      type: replyDb.DataTypes.INTEGER,
      allowNull: false,
      field: "comment_id",
    },
    content: {
      type: replyDb.DataTypes.STRING,
      allowNull: false,
      field: "content",
    },
    from_email: {
      type: replyDb.DataTypes.STRING,
      allowNull: false,
      field: "from_email",
    },
    to_email: {
      type: replyDb.DataTypes.STRING,
      allowNull: false,
      field: "to_email",
    },
  },
  {
    tableName: "reply_table",
  }
);

module.exports = Reply;
