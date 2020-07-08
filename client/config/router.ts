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
        component: () => import("@/pages/Home.vue"),
      },
      {
        name: "register",
        path: "/register",
        component: () => import("@/pages/Register.vue"),
      },
      {
        name: "login",
        path: "/login",
        component: () => import("@/pages/Login.vue"),
      },
      {
        name: "focus",
        path: "/focus",
        component: () => import("@/pages/Focus.vue"),
        meta: {
          auth: true,
        },
      },
      {
        name: "frontend",
        path: "/frontend",
        component: () => import("@/pages/Frontend.vue"),
      },
      {
        name: "backend",
        path: "/backend",
        component: () => import("@/pages/Backend.vue"),
      },
      {
        name: "freebie",
        path: "/freebie",
        component: () => import("@/pages/Freebie.vue"),
      },
      {
        name: "career",
        path: "/career",
        component: () => import("@/pages/Career.vue"),
      },
      {
        name: "write",
        path: "/write",
        component: () => import("@/pages/Write.vue"),
        meta: {
          auth: true,
        },
      },
      {
        name: "blog",
        path: "/blog",
        component: () => import("@/pages/Blog.vue"),
      },
      {
        name: "userCenter",
        path: "/userCenter",
        component: () => import("@/pages/UserCenter.vue"),
        meta: {
          auth: true,
        },
      },
      {
        name: "author",
        path: "/author",
        component: () => import("@/pages/Author.vue"),
        meta: {
          auth: true,
        },
      },
      {
        name: "search",
        path: "/search",
        component: () => import("@/pages/Search.vue"),
      },
      {
        path: "*",
        redirect: "/",
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return {
        x: 0,
        y: 0
      };
    },
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
