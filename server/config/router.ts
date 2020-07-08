const KoaRouter = require("koa-router")(); // 引入时实例化路由
const UserController = require("../controllers/UserController.ts");
const SortController = require("../controllers/SortController.ts");
const BlogController = require("../controllers/BlogController.ts");
const FollowController = require("../controllers/FollowController.ts");
const CommentController = require("../controllers/CommentController.ts");

module.exports = (app) => {
	// KoaRouter.prefix('/api');
	// 1.用户资源restful API
	// 用户注册
	KoaRouter.post("/users/register", UserController.doRegister);
	// 用户登录
	KoaRouter.post("/users/login", UserController.doLogin);
	// 修改用户信息
	KoaRouter.put("/users/update", UserController.modifyUser);
	// 获取用户信息(根据email)
	KoaRouter.get("/users/info/:email", UserController.getUser);
	// 关注
	KoaRouter.post("/users/follow", FollowController.followOne);
	// 取消关注
	KoaRouter.post("/users/unfollow", FollowController.unfollowOne);
	// 获取关注者列表
	KoaRouter.get("/users/follow/:user_email", FollowController.getFollowers);
	// 获取粉丝列表
	KoaRouter.get("/users/unfollow/:user_email", FollowController.getFans);
	// 判断是否关注某个用户
	KoaRouter.post("/users/isFollow", FollowController.isFollowOne);

	// 2.博客资源RestFul API
	// 获取所有博客类型
	KoaRouter.get("/blogs/sort", SortController.getAllSorts);
	// 新增博客
	KoaRouter.post("/blogs/new", BlogController.addBlog);
	// 更新博客
	KoaRouter.put("/blogs/update", BlogController.updateBlog);
	// 获取所有博客
	KoaRouter.get("/blogs/list", BlogController.getBlogs);
	// 根据blog_id查询博客
	KoaRouter.get("/blogs/id/:blog_id", BlogController.getBlogById);
	// 根据email查询博客
	KoaRouter.get("/blogs/email/:email", BlogController.getBlogsByEmail);
	// 搜索博客
	KoaRouter.get("/blogs/search/:keyword", BlogController.searchBlog);
	// 根据博客类型搜索博客
	KoaRouter.get("/blogs/sort/:sort_id", BlogController.getBlogBySortId);
	// 2.1博客评论
	// 添加评论
	KoaRouter.post("/blogs/comment", CommentController.addComment);
	// 获取评论
	KoaRouter.get("/blogs/comments/:blog_id", CommentController.getComments);

	app.use(KoaRouter.routes()).use(KoaRouter.allowedMethods());
	/*
   router.routes(): 启动路由
   router.allowedMethods()作用： 这是官方文档的推荐用法，我们可以看到
   router.allowedMethods()用在了路由匹配 router.routes()之后，所以在当所有
   路由中间件最后调用。此时根据 ctx.status 设置 response 响应头
   */
};
