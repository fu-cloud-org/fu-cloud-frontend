<template>
  <div class="FanOrFollow_box" style="padding: 15px">
    <div class="FanOrFollow" v-for="(item, index) in allData">
      <div class="FanOrFollow_left" @click="personal(item.id)">
        <img class="FanOrFollow_img" :src="attachImg(item.avatar)"/>
      </div>
      <div class="FanOrFollow_info">
        <div class="FanOrFollow_info_top">
          <span
              style="font-weight: bolder; font-size: 15px"
              @click="personal(item.id)"
          >{{ item.alias }}</span>
          <span style="color: lightslategray" @click="personal(item.id)">@{{ item.username }}</span>
        </div>
        <div class="FanOrFollow_info_bottom">
          <span @click="personal(item.id)">{{ item.sign }}</span>
        </div>
      </div>
      <div class="FanOrFollow_bottom" v-show="$route.params.id === user.id && $route.name === 'myFollowers'">
        <el-button
            v-if="item.isMyFollowed"
            @click="follow(item.id, item.isMyFollowed)"
            type="primary"
            size="small"
            class="el-icon-check"
            plain
            round
        >取消关注</el-button>
        <el-button
            v-else
            @click="follow(item.id, item.isMyFollowed)"
            type="primary"
            size="small"
            plain
            round
        >关注</el-button>
      </div>
    </div>
    <div>
      <el-empty
          v-if="allData.length === 0"
          :image-size="250"
          description="这里什么都没有哟"
      ></el-empty>
    </div>
  </div>
</template>

<script>
import {follow, getMyFans, getMyFollowers, unFollow} from "@/api/follow.js";
import { attachImg} from "@/utils/attachImg";
import {mapGetters} from "vuex";

export default {
  name: "MyFanAndFollow",
  inject: ["reload"],
  data() {
    return {
      attachImg,
      allData: [],
      isFollow: true,
      followData: {
        fanId: "",
        followId: "",
      },
      isFollowId: [],
    };
  },
  computed: {
    ...mapGetters([
        "token",
        "user"
    ]),
  },
  watch: {
    $route(to, from) {
      if (to.path === `/user/personal/myFans/${this.$route.params.id}`) {
        getMyFans(this.$route.params.id, this.user.username)
            .then((res) => {
              console.log(res);
              this.allData = res.data;
              getMyFollowers(this.$route.params.id, this.user.username).then((res) => {
                res.data.forEach((element) => {
                  this.isFollowId.push(element.id);
                });
              });
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        getMyFollowers(this.$route.params.id, this.user.username)
            .then((res) => {
              console.log(res);
              this.allData = res.data;
              res.data.forEach((element) => {
                this.isFollowId.push(element.id);
              });
            })
            .catch((err) => {
              console.log(err);
            });
      }
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      if (
          this.$route.path === `/user/personal/myFans/${this.$route.params.id}`
      ) {
        getMyFans(this.$route.params.id, this.user.username)
            .then((res) => {
              console.log(res);
              this.allData = res.data;
              getMyFollowers(this.$route.params.id, this.user.username).then((res) => {
                res.data.forEach((element) => {
                  this.isFollowId.push(element.id);
                });
              });
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        getMyFollowers(this.$route.params.id, this.user.username)
            .then((res) => {
              console.log(res);
              this.allData = res.data;
              res.data.forEach((element) => {
                this.isFollowId.push(element.id);
              });
            })
            .catch((err) => {
              console.log(err);
            });
      }
    },
    follow(id, isMyFollowed) {
      if(this.token != null && this.token !== '' && !isMyFollowed){
        follow(id).then(res => {
          const {msg} = res;
          this.$message.success(msg);
          this.load();
        })
      } else if(this.token != null && this.token !== '' && isMyFollowed){
        unFollow(id).then(res => {
          const {msg} = res;
          this.$message.success(msg);
          this.load();
        })
      } else {
        this.$message({
          showClose: true,
          message: '请先登录再进行操作哦',
          type: 'warning'
        })
      }
    },
    personal(id) {
      this.$router.push({ path: `/member/${id}/home` });
    },
  },
};
</script>

<style>
.FanOrFollow_box :hover {
  border-width: 1px;
  /*border-color: deepskyblue;*/
}
.FanOrFollow {
  /*padding: 15px 40px 15px 30px;*/
  padding: 1px 30px 1px 30px;
  height: 70px;
  display: flex;
  align-items: center;
  /*border: 1px solid #ebebeb;*/
}
.FanOrFollow :hover {
  border-width: 1px;
  /*border-color: deepskyblue;*/
}
.FanOrFollow_left {
  width: 40px;
  height: 40px;
}
.FanOrFollow_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /*border: 1px solid #ebebeb;*/
  vertical-align: top;
}
.FanOrFollow_info {
  display: inline-block;
  margin-left: 20px;
  -webkit-box-flex: 1;
  /*-ms-flex-positive: 1;*/
  flex-grow: 1;
  height: 50px;
  overflow: hidden;
}
.FanOrFollow_info_top {
  margin-top: 2px;
  display: inline-block;
  font-size: 10px;
  line-height: 14px;
  vertical-align: top;
  cursor: pointer;
}
.FanOrFollow_info_top :hover {
  color: deepskyblue;
}
.FanOrFollow_info_bottom {
  line-height: 14px;
  color: #999;
  margin-top: 5px;
  cursor: pointer;
}
.FanOrFollow_info_bottom :hover {
  color: deepskyblue;
}
</style>
