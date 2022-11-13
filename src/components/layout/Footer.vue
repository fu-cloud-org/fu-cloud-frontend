<template>
  <footer class="footer has-text-grey-light has-background-grey-darker">
    <div class="container">
      <div class="">
        <span>愿乘冷风去，直出福云间</span>

        <span style="float: right">
          <router-link :to="{path:'/admin/login'}">
            admin login
          </router-link>
          |
          <a href="/?lang=zh_CN">中文</a> |
          <a href="/?lang=en_US">English</a>
        </span>
      </div>

      <div>
        <span>{{ title }} ALL RIGHTS RESERVED</span>
        <div style="float: right">
          <template>
            <b-taglist attached>
              <b-tag type="is-dark" size="is-normal">Design By</b-tag>
              <b-tag type="is-info" size="is-normal">{{ author }}</b-tag>
            </b-taglist>
          </template>
        </div>
      </div>
    </div>
    <back-top></back-top>
  </footer>
</template>

<script>
import BackTop from "@/components/BackTop";
export default {
  name: "Footer",
  components: {
    BackTop
  },
  data() {
    return {
      title: "© " + new Date().getFullYear() + '福云社',
      author: '福云社',
    };
  },
};
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
}
footer a{
  color: #bfbfbf;
}
</style>