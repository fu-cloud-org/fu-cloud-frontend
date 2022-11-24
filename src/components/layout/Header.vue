<template>
  <header class="header has-background-white has-text-black">
    <b-navbar
        class="container is-white"
        :fixed-top="true"
    >
      <template slot="brand">
        <b-navbar-item
            tag="router-link"
            :to="{ path: '/' }"
        >
          <img :src="fu_cloud_icon" alt="logo">
          &nbsp 福云
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <b-field position="is-centered">
            <el-input placeholder="搜索帖子、标签和用户"
                      border-radius=4
                      v-model="searchKey"
                      @keyup.enter.native="search()"
                      size="medium"
                      prefix-icon="el-icon-search"
            />
          </b-field>
        </b-navbar-item>

        <b-navbar-item tag="div">
          <el-switch
              style="display: block"
              v-model="darkMode"
              active-color="#167df0"
              inactive-color="pink"
              active-icon-class="el-icon-moon"
              inactive-icon-class="el-icon-sunny"
              >
          </el-switch>
        </b-navbar-item>

        <b-navbar-item
            v-if="token == null || token === ''"
            tag="div"
        >
          <div class="buttons">
            <b-button
                rounded
                class="is-light is-warning"
                tag="router-link"
                :to="{ path: '/authentic' }"
            >
              登录/注册
            </b-button>
          </div>
        </b-navbar-item>
        <b-navbar-dropdown
            v-else
            :label="user.alias"
        >
          <b-navbar-item
              tag="router-link"
              :to="{ path: `/member/${user.id}/home` }"
          >
<!--            <i class="el-icon-user-solid" style="font-size: 20px"/> &nbsp; 个人中心-->
            <div class="user-avatar">
              <img :src="attachImg(user.avatar)"/>
            </div> &nbsp; 个人中心
          </b-navbar-item>
<!--          <hr class="dropdown-divider">-->
<!--          <b-navbar-item-->
<!--              tag="router-link"-->
<!--              :to="{ path: `/member/${user.username}/setting` }"-->
<!--          >-->
<!--            <i class="el-icon-s-tools" style="font-size: 20px"/> &nbsp; 设置中心-->
<!--          </b-navbar-item>-->
          <hr class="dropdown-divider">
          <b-navbar-item
              tag="a"
              @click="logout"
          > <i class="el-icon-warning" style="font-size: 20px"/>&nbsp; 退出登录
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item>
          <div class="fullScreen-btn" @click="handleFullScreen">
            <el-tooltip :content="fullscreen?`退出全屏`:`全屏`" placement="bottom">
              <i class="el-icon-full-screen"/>
            </el-tooltip>
          </div>
        </b-navbar-item>

      </template>
    </b-navbar>
  </header>
</template>

<script>
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader'
import { getDarkMode, setDarkMode } from '@/utils/auth'
import { mapGetters } from 'vuex'
import {attachImg} from "@/utils/attachImg";
export default {
  name: 'Header',
  data() {
    return {
      fullScreen: false,
      attachImg: attachImg,
      logoUrl: require('@/assets/fu-cloud-icon.png'),
      fu_cloud_icon: require('@/assets/fu-cloud-icon.png'),
      searchKey: '',
      darkMode: false
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  mounted() {
    window.addEventListener('keydown', function(event) {
      //禁掉F11的全屏的默认事件,不会禁止F11的退出全屏
      const e = event || window.event
      if (e && e.keyCode === 122) {
        e.preventDefault()
      }
    })
    document.addEventListener('fullscreenchange', () => {
      this.fullscreen = !this.fullscreen;
    })
    document.addEventListener('mozfullscreenchange', () => {
      this.fullscreen = !this.fullscreen
    })
    document.addEventListener('webkitfullscreenchange', () => {
      this.fullscreen = !this.fullscreen
    })
    document.addEventListener('msfullscreenchange', () => {
      this.fullscreen = !this.fullscreen
    })
  },
  watch: {
    // 监听Theme模式
    darkMode(val) {
      if (val) {
        enableDarkMode({})
      } else {
        disableDarkMode()
      }
      setDarkMode(this.darkMode)
    }
  },
  created() {
    // 获取cookie中的夜间还是白天模式
    this.darkMode = getDarkMode()
    if (this.darkMode) {
      enableDarkMode({})
    } else {
      disableDarkMode()
    }
  },
  methods: {
    handleFullScreen(){
      if (this.fullscreen){
        if (document.exitFullscreen){
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) { // safari, chrome
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) { // firefox
          document.mozCancelFullScreen();
        } else if (document.msExitFullScreen) { // IE
          document.msExitFullScreen();
        }
      } else {
        let element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) { // safari, chrome
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) { // firefox
          element.mozRequestFullScreen()
        } else if (element.msRequestFullScreen) { // IE
          element.msRequestFullScreen()
        }
      }
      // this.fullscreen = !this.fullscreen;
    },
    async logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$message.info('退出登录成功')
        setTimeout(() => {
          this.$router.push({ path: '/authentic' })
        }, 500)
      })
    },
    search() {
      console.log(this.token)
      if (this.searchKey.trim() === null || this.searchKey.trim() === '') {
        this.$message.info({
          showClose: true,
          message: '请输入关键字搜索！',
          type: 'warning'
        })
        return false
      }
      this.$router.push({ path: '/search?key=' + this.searchKey })
    }
  }
}
</script>

<style scoped>
input {
  width: 80%;
  height: 86%;
}
.button.search {
  background-color: lightgray;
  border-color: transparent;
  color: #fff;
}
::v-deep .el-input__inner {
  border-radius: 23px;
  height: 45px;
}

.user-avatar {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50% !important;
}
</style>