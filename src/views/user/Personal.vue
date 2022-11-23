<template>
  <div style="height: 100%; min-height: 100%">
    <div style="height: 100%; min-height: 100%; margin-bottom: 90px">
      <Header/>
      <div class="container" style="margin-top: 90px; margin-bottom: 90px">
        <div class="PersonTop">
          <div class="PersonTop_img">
            <img :src="attachImg(personUser.avatar)" />
          </div>
          <div class="PersonTop_text">
            <div class="user_text">
              <div class="user_name" style="display: flex">
                <span> {{ personUser.alias }} </span> &nbsp; &nbsp;
                <div v-if="token">
                  <el-button
                      v-if="personUser.username === user.username"
                      v-text="'编辑'"
                      type="primary"
                      size="small"
                      class="el-icon-edit"
                      plain
                      round
                      @click="edit"
                  ></el-button>
                  <div v-else>
                    <el-button
                        v-if="hasFollowed"
                        @click="follow"
                        type="primary"
                        size="small"
                        class="el-icon-check"
                        plain
                        round
                    >取消关注</el-button>
                    <el-button
                        v-else
                        @click="follow"
                        type="primary"
                        size="small"
                        plain
                        round
                    >关注</el-button>
                  </div>
                </div>
              </div>
              <div class="user-v" >
                <i class="el-icon-school"/> &nbsp;
                <span class="user-v-font">{{ personUser.dep }}</span>
              </div>
              <div class="user_sign">
                <span> {{ personUser.sign }}</span>
              </div>

            </div>
            <div class="user_num">
              <div @click="myfan">
                <div class="num_number">{{ userProfile.followerCount }}</div>
                <span class="num_text">粉丝</span>
              </div>
              <div @click="myfollow">
                <div class="num_number">{{ userProfile.fansCount }}</div>
                <span class="num_text">关注</span>
              </div>
              <div>
                <div class="num_number">{{ userProfile.postCount }}</div>
                <span class="num_text">帖子</span>
              </div>
            </div>
          </div>
        </div>
        <div class="person_body">
          <div class="person_body_left">
            <el-card class="box-card" :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
            <span class="person_body_list" style="border-bottom: none"
            >个人中心</span
            >
              </div>
              <!-- <div
                class="person_body_list"
                v-for="(item, index) in person_body_list"
                :key="index"
              >
                <router-link :to="{ name: item.name, params: item.params }">{{
                  item.label
                }}</router-link>
              </div> -->
              <el-menu
                  router
                  active-text-color="#00c3ff"
                  class="el-menu-vertical-demo"
              >
                <el-menu-item
                    index="info"
                    :route="{ name: 'info', params: $route.params.id }"
                >
                  <i class="el-icon-user"></i>
                  <span slot="title">个人简介</span>
                </el-menu-item>
                <el-menu-item
                    index="myarticle"
                    :route="{ name: 'myarticle', params: $route.params.id }"
                >
                  <i class="el-icon-edit-outline"></i>
                  <span slot="title">发帖</span>
                </el-menu-item>
                <el-menu-item
                    index="mycollect"
                    :route="{ name: 'mycollect', params: $route.params.id }"
                >
                  <i class="el-icon-document"></i>
                  <span slot="title">收藏</span>
                </el-menu-item>
                <el-menu-item
                    index="myfan"
                    :route="{ name: 'myfan', params: $route.params.id }"
                >
                  <i class="el-icon-tableware"></i>
                  <span slot="title">粉丝</span>
                </el-menu-item>
                <el-menu-item
                    index="myfollow"
                    :route="{ name: 'myfollow', params: $route.params.id }"
                >
                  <i class="el-icon-circle-plus-outline"></i>
                  <span slot="title">关注</span>
                </el-menu-item>
              </el-menu>
            </el-card>
          </div>
          <div class="person_body_right">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <personal-dia ref="dia" @flesh="reload" />
    </div>
    <Footer id="footer"/>
  </div>

</template>

<script>
import {attachImg} from "@/utils/attachImg";
// import { userInfo } from "@/api/user";
import {
  myFollow,
  addFollow,
  deleteFollow,
  followAndFanCount, isFollowed, follow, unFollow,
} from "@/api/follow.js";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {getInfoByName, getUserProfile} from "@/api/auth";
import {mapGetters} from "vuex";
import PersonalDia from "@/components/dialog/PersonalDia";
// import PersonalDia from "./PersonalDia.vue";

export default {
  name: "Personal",
  components: {PersonalDia, Footer, Header},
  inject: ["reload"],
  data() {
    return {
      page: {
        current: 1,
        size: 5,
        total: 0
      },
      personUser: {},
      attachImg,
      avatar: "",
      nickname: "",
      v: 1,
      design: "",
      isfollow: true,
      followData: {
        fanId: "",
        followId: "",
      },
      isfollowid: [],
      hasFollowed: false,
      userProfile: {
        type: Object,
        default: null
      },
    };
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  mounted() {
    this.load();
  },
  watch: {
    $route(to, from) {
      if (to.path == `/newsuser/personal/${this.$store.state.id}`) {
        this.reload();
      } else if (to.path == `/newsuser/personal/${this.$route.params.id}`) {
        this.reload();
      }
    },
  },
  methods: {
    load() {
      if(this.token != null && this.token !== '') {
        isFollowed(this.$route.params.id).then(value => {
          const { data } = value
          this.hasFollowed = data.hasFollowed
        })
      }
      getUserProfile(this.$route.params.id).then(res => {
        const {data} = res
        this.userProfile = data
      })
      getInfoByName(this.$route.params.id, this.page.current, this.page.size)
          .then(res => {
            const {data} = res;
            this.personUser = data.user;
          })

      // myFollow(this.$store.state.id)
      //     .then((res) => {
      //       res.data.forEach((res) => {
      //         this.isfollowid.push(res.id);
      //       });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //
      // followAndFanCount(this.$route.params.id)
      //     .then((res) => {
      //       this.followCounts = res.data.followCounts;
      //       this.fanCounts = res.data.fanCounts;
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //
      // mygoodCount(this.$route.params.id)
      //     .then((res) => {
      //       this.goodCounts = res.data.goodCounts;
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    },
    myfan() {
      this.$router.push({
        path: `/newsuser/personal/myfan/${this.$route.params.id}`,
      });
    },
    myfollow() {
      this.$router.push({
        path:`/newsuser/personal/myfollow/${this.$route.params.id}`,
      });
    },
    follow() {
      if(this.token != null && this.token !== '' && !this.hasFollowed)
      {
        follow(this.$route.params.id).then(response => {
          const { message } = response
          this.$message.success(message)
          this.hasFollowed = !this.hasFollowed
          this.userProfile.followerCount = parseInt(this.userProfile.followerCount) + 1
        })
      } else if(this.token != null && this.token !== '' && this.hasFollowed) {
        unFollow(this.$route.params.id).then(response => {
          const { message } = response
          this.$message.success(message)
          this.hasFollowed = !this.hasFollowed
          this.userProfile.followerCount = parseInt(this.userProfile.followerCount) - 1
        })
      }
    },
    edit() {
      this.$refs.dia.open();
    },
  },
};
</script>

<style scoped>
#footer {
  width: 100%;
  height: 150px;
}
.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: fixed;
  left: 0;
  z-index: 0;
  top: 0;
}
.PersonTop {
  width: 1000px;
  height: 170px;
  padding-top: 20px;
  background-color: white;
  margin-top: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 5px;
}

.PersonTop_img {
  width: 150px;
  height: 130px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.PersonTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 40px;
}

.user_name {
  font-weight: bold;
  font-size: 20px;
}
.user-v {
  margin-bottom: -5px;
}
.user-v-img {
  width: 15px;
  height: 15px;
}
.user-v-font {
  font-size: 15px;
  color: #00c3ff;
}
.user_sign {
  font-size: 14px;
  color: #999;
}

.user_num {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num > div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
}
.el-menu-item>span {
  font-size: 16px;
  color: #999;
}

/*下面部分样式*/
.person_body {
  width: 1000px;
  margin-top: 220px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.person_body_left {
  width: 27%;
  height: 600px;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  font-weight: bolder;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(
      left,
      #3498db,
      pink 20%,
      #3498db 40%,
      pink 60%,
      lightgray 80%,
      pink 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
}

.el-menu-item {
  margin-top: 22px;
}

.person_body_right {
  width: 70%;
  /* height: 500px; */
  border-radius: 5px;
  background-color: white;
}

.box-card {
  height: 500px;
}

</style>
