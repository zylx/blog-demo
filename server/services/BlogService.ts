const BlogModel = require("../models/BlogModel.ts");
const blogDb2 = require("../config/db.ts");
const blogUserModel = require("../models/UserModel.ts");

BlogModel.belongsTo(blogUserModel, { foreignKey: "email", targetKey: "email" });

module.exports = {
  // 插图博文记录
  insertBlog: async (title, email, content, sort_id) => {
    return await BlogModel.create({
      title,
      email,
      content,
      sort_id,
    });
  },
  // 更新博客
  updateBlog: async (blog_id, title, content, sort_id) => {
    return await BlogModel.update(
      {
        title,
        content,
        sort_id,
      },
      {
        where: {
          blog_id,
        },
      }
    );
  },
  // 查找所有博文
  findBlogs: async () => {
    return await BlogModel.findAll({
      include: [
        {
          model: blogUserModel,
          attributes: ["email", "username", "avatar"],
        },
      ],
    });
  },
  // 分页获取博文（按时间降序排序）
  findBlogsByPage: async (pageSize, currentPage) => {
    let offset = (currentPage - 1) * pageSize;
    return await BlogModel.findAll({
      offset,
      limit: pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: blogUserModel,
          attributes: ["email", "username", "avatar"],
        },
      ],
    });
  },
  // 根据关键字查询
  findBlogByKeyword: async (keyword) => {
    return await BlogModel.findAll({
      where: {
        [blogDb2.Op.or]: [
          {
            title: {
              [blogDb2.Op.like]: `%${keyword}%`,
            },
            content: {
              [blogDb2.Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: UserModel,
          attributes: ["email", "username", "avatar"],
        },
      ],
    });
  },
  
  //根据 id / 类型id / email 查询博客，传入一个对象，如：{blog_id: blog_id}
  findBlogByField: async (fieldObject) => {
    return await BlogModel.findAll({
      where: fieldObject,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: UserModel,
          attributes: ["email", "username", "avatar"],
        },
      ],
    });
  },
};
