<template>
    <el-card class="box-card">
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
    </el-card>
</template>

<script>
import { attachImg } from "@/utils/attachImg";
import { isFollowed } from '@/api/follow'
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
  mounted() {
    this.fetchInfo()
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    fetchInfo() {
      if(this.token != null && this.token !== '')
      {
        isFollowed(this.user.id).then(value => {
          const { data } = value
          this.hasFollow = data.hasFollow
        })
      }
      if (this.user.id === this.postUser.id) {
        this.isSelf = true
      }
    },
  }
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