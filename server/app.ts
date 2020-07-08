const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser"); // 配置post bodyparser的中间件
const koajwt = require("koa-jwt"); // koa中对token校验的中间件
const koaStatic = require("koa-static"); // 配置静态web服务的中间件
const router = require("./config/router.ts");

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
	await next().catch((err) => {
		if (err.status === 401) {
			ctx.status = 401;
			ctx.body = "Protected resource, use Authorization header to get access\n";
		} else {
			throw err;
		}
	});
});

const SECRET = "secret"; // 自定义

app.use(
	koajwt({ secret: SECRET }).unless({
		// unless表示不对登录注册做token校验(颁发token时密钥是secret)
		// 最后一个规则是开放根路径，使得首页不需要鉴权即可通过后端访问
		path: [
			/^\/users\/login/,
			/^\/users\/register/,
			/^\/users\/info/,
			/^\/blogs\/list/,
			/^\/blogs\/sort/,
			/^\/blogs\/id/,
			/^\/blogs\/email/,
			/^\/blogs\/search/,
			/^\/blogs\/comments/,
			/^\//
		]
	})
);

router(app);

//配置post bodyparser的中间件
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, "./public/dist")));

// 在端口8001监听:
app.listen(8001, () => {
	console.log("server is running at http://localhost:8001...");
});
