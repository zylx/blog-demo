const blogDb1 = require("../config/db.ts");

const Blog = blogDb1.sequelize.define(
  "blog",
  {
    blog_id: {
      type: blogDb1.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "blog_id",
    },
    title: {
      type: blogDb1.DataTypes.STRING,
      allowNull: false,
      field: "title",
    },
    email: {
      type: blogDb1.DataTypes.STRING,
      allowNull: false,
      field: "email",
    },
    content: {
      type: blogDb1.DataTypes.TEXT,
      allowNull: false,
      field: "content",
    },
    sort_id: {
      type: blogDb1.DataTypes.INTEGER,
      allowNull: false,
      field: "sort_id",
    },
  },
  {
    tableName: "blog_table",
  }
);

module.exports = Blog;
