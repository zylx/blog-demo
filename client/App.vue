<template>
  <div id="app">
    <header v-if="!['register', 'login', 'write'].includes($route.name)">
      <header-section />
    </header>
    <main>
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import HeaderSection from "@/components/Header.vue";
export default {
  name: "App",
  data() {
    return {

    };
  },
  mounted(){
      console.log(this.$route);
  },
  components: {
    HeaderSection,
  },
};
</script>

<style lang="stylus">
html,
body
  margin 0;
  padding 0;
  background-color #f4f5f5;
#app
    header
        display flex;
        justify-content center;
        align-items center;
        margin 0 auto;
        border-bottom 1px solid #f1f1f1;
        background-color #fff;
    main
        background-color #f4f5f5;
        padding 10px;
        .content-wrapper
            background-color #fff;
            width 1180px;
            margin 0 auto;
</style>
