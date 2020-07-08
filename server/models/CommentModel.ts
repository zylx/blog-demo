const commentDb = require("../config/db.ts");

const Comments = commentDb.sequelize.define(
  "comment",
  {
    comment_id: {
      type: commentDb.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "comment_id",
    },
    email: {
      type: commentDb.DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "email",
    },
    blog_id: {
      type: commentDb.DataTypes.INTEGER,
      allowNull: false,
      field: "blog_id",
    },
    comment: {
      type: commentDb.DataTypes.TEXT,
      allowNull: false,
      field: "comment",
    },
  },
  {
    tableName: "comment_table",
  }
);

module.exports = Comments;
