<template>
  <div id="career">
    <div v-for="blog in blogList" :key="blog.blog_id">
      <article-card :blog="blog"></article-card>
    </div>
  </div>
</template>

<script lang="typescript">
export default {
    data() {
        return {
            blogList: []
        }
    },
    created() {
        this.getBlogs();
    },
    components: {
        'article-card': () => import('@/components/Card.vue')
    },
    methods: {
        getBlogs() {
            this.axios.get('/blogs/sort/' + 4).then(res => {
                this.blogList = res;
            }, err => {
                console.error(err);
            })
        }
    }
}
</script>

<style lang="stylus">
#career
    padding 18px 24px;
</style>
