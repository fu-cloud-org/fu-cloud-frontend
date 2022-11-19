<template>
    <el-card class="box-card">
      <div v-if="token != null && token !== ''" >
        <div class="user-avatar">
          <img :src="attachImg(user.avatar)"/>
        </div> &nbsp;
        <div class="has-text-centered">
          <p class="is-size-5 mb-5">
            <router-link :to="{ path: `/member/${user.username}/home` }">
              {{ user.alias }} <span class="is-size-7 has-text-grey">{{ '@' + user.username }}</span>
            </router-link>
          </p>
          <div class="columns is-mobile">
            <div class="column is-one-third">
              <code>{{ user.postCount }}</code>
              <p>帖子</p>
            </div>
            <div class="column is-one-third">
              <code>{{ user.followerCount }}</code>
              <p>粉丝</p>
            </div>
            <div class="column is-one-third">
              <code>{{ user.fansCount }}</code>
              <p>关注</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="has-text-centered">
        <b-button type="is-danger" tag="router-link" :to="{path:'/authentic'}" outlined>立即登录/注册</b-button>
      </div>
    </el-card>
</template>

<script>
import { attachImg } from "@/utils/attachImg";
import { mapGetters } from 'vuex'
export default {
  name: 'Self',
  props: {
    user: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      hasFollow: false,
      attachImg: attachImg,
      isSelf: false
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
}
</script>

<style scoped>
.user-avatar img {
  display: block;
  border-radius: 50%;
  width:150px;
  height:150px;
  margin:0 auto;
}
</style>