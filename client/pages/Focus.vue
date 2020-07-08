<template>
  <div id="focus">
    <div v-for="blog in blogList" :key="blog.blog_id">
      <article-card :blog="blog"></article-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Focus",
  data() {
    return {
      follwoerList: [],
      blogList: [],
    };
  },
  created() {
    this.getFollowerList();
  },
  methods: {
    // 获取关注着
    getFollowerList() {
      this.axios
        .get("/users/follower" + this.$store.getters.getUser.email)
        .then(
          (res) => {
            this.follwoerList = res.data;
            this.getFollowerBlogs();
          },
          (err) => {
            if (err.code === -1) {
              // 鉴权失败
              this.$Modal.info({
                content: "登录过期,请重新登录!",
              });
              this.$store.commit("logout");
              this.$router.push({ name: "login" });
            }
          }
        );
    },
    // 获取关注者的所有博文
    getFollowerBlogs() {
      // 先返回所有异步请求结果
      let promiseAll = this.follwoerList.map((item) => {
        return this.axios.get("/blogs/email/" + item.follow_email);
      });
      // 再处理所有回调结果
      this.axios.all(promiseAll).then((resArr) => {
        resArr.forEach(
          (res) => {
            this.blogList = this.blogList.concat(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      });
    },
  },
  compoents: {
    "article-card": () => import("@/components/Card.vue"),
  },
};
</script>

<style lang="stylus">
#focus
    padding 18px 24px;
</style>
