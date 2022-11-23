<template>
  <section id="author">
    <el-card class="">
      <div slot="header">
        <i class="el-icon-info"/> &nbsp;
        <span class="has-text-weight-bold">关于作者</span>
      </div>
      <div class="user-avatar">
        <img :src="attachImg(user.avatar)"/>
      </div> &nbsp;
      <div class="has-text-centered">
        <p class="is-size-5 mb-5">
          <router-link :to="{ path: `/member/${user.id}/home` }">
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
        <div>
          <button
              v-if="hasFollow && !isSelf"
              class="button is-success button-center is-fullwidth"
              @click="handleUnFollow(user.id)"
          >
            已关注
          </button>

          <button v-if="!hasFollow && !isSelf" class="button is-link button-center is-fullwidth" @click="handleFollow(user.id)">
            关注
          </button>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import { attachImg } from "@/utils/attachImg";
import { follow, isFollowed, unFollow } from '@/api/follow'
import { mapGetters } from 'vuex'
export default {
  name: 'Author',
  props: {
    user: {
      type: Object,
      default: null
    },
    postUser: {
      type: Object,
      default: null
    }
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
    handleFollow: function(id) {
      if(this.token != null && this.token !== '')
      {
        follow(id).then(response => {
          const { message } = response
          this.$message.success(message)
          this.hasFollow = !this.hasFollow
          this.user.followerCount = parseInt(this.user.followerCount) + 1
        })
      }
      else{
        this.$message.info('请先登录')
      }
    },
    handleUnFollow: function(id) {
      unFollow(id).then(response => {
        const { message } = response
        this.$message.success(message)
        this.hasFollow = !this.hasFollow
        this.user.followerCount = parseInt(this.user.followerCount) - 1
      })
    }
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