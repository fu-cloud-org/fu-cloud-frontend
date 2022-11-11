<template>
  <el-card class="box-card">
    <div slot="header">
      <i class="el-icon-edit"></i> &nbsp;
      <span>发帖</span>
    </div>
    <div v-if="token != null && token !== ''" class="has-text-centered">
      <b-button type="is-danger" tag="router-link" :to="{path:'/post/create'}" outlined>✍ 发表想法</b-button>
    </div>

    <div v-else class="has-text-centered">
      <b-button type="is-primary" tag="router-link" :to="{path:'/authentic'}" outlined>去登录/注册</b-button>
<!--      <b-button type="is-danger" tag="router-link" :to="{path:'/login'}" outlined class="ml-2"> 社区登入</b-button>-->
    </div>
  </el-card>
</template>

<script>
import {mapGetters } from "vuex";

export default {
  name: "WelcomeLogin",
  computed: {
    ...mapGetters([
      'token'
    ])
  }
}
</script>

<style scoped>

</style>