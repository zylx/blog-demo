import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决路由重复点击报错Uncaught Promise，统一捕捉错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

export default () => {
	const router = new VueRouter({
		mode: "history",
		base: __dirname,
		linkActiveClass: "active-link",
		linkExactActiveClass: "click-active",
		fallback: true,
		routes: [
			{
				name: "home",
				path: "/",
				component: () =>
					import(/* webpackChunkName: "home" */ "@/pages/Home.vue")
			},
			{
				name: "register",
				path: "/register",
				component: () =>
					import(/* webpackChunkName: "register" */ "@/pages/Register.vue")
			},
			{
				name: "login",
				path: "/login",
				component: () =>
					import(/* webpackChunkName: "login" */ "@/pages/Login.vue")
			},
			{
				name: "focus",
				path: "/focus",
				component: () =>
					import(/* webpackChunkName: "focus" */ "@/pages/Focus.vue"),
				meta: {
					auth: true
				}
			},
			{
				name: "frontend",
				path: "/frontend",
				component: () =>
					import(/* webpackChunkName: "frontend" */ "@/pages/Frontend.vue")
			},
			{
				name: "backend",
				path: "/backend",
				component: () =>
					import(/* webpackChunkName: "backend" */ "@/pages/Backend.vue")
			},
			{
				name: "freebie",
				path: "/freebie",
				component: () =>
					import(/* webpackChunkName: "freebie" */ "@/pages/Freebie.vue")
			},
			{
				name: "career",
				path: "/career",
				component: () =>
					import(/* webpackChunkName: "career" */ "@/pages/Career.vue")
			},
			{
				name: "write",
				path: "/write",
				component: () =>
					import(/* webpackChunkName: "write" */ "@/pages/Write.vue"),
				meta: {
					auth: true
				}
			},
			{
				name: "blog",
				path: "/blog",
				component: () =>
					import(/* webpackChunkName: "blog" */ "@/pages/Blog.vue")
			},
			{
				name: "userCenter",
				path: "/userCenter",
				component: () =>
					import(/* webpackChunkName: "userCenter" */ "@/pages/UserCenter.vue"),
				meta: {
					auth: true
				}
			},
			{
				name: "author",
				path: "/author",
				component: () =>
					import(/* webpackChunkName: "author" */ "@/pages/Author.vue"),
				meta: {
					auth: true
				}
			},
			{
				name: "search",
				path: "/search",
				component: () =>
					import(/* webpackChunkName: "search" */ "@/pages/Search.vue")
			},
			{
				path: "*",
				redirect: "/"
			}
		],
		scrollBehavior(to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition;
			}
			return {
				x: 0,
				y: 0
			};
		}
	});

	router.beforeEach((to, from, next) => {
		if (to.meta.auth) {
			// 需要做鉴权校验的路由
			if (JSON.parse(localStorage.getItem("token"))) next();
			else {
				alert("您还未登录");
				next("/login");
			}
		} else {
			next();
		}
	});

	return router;
};
