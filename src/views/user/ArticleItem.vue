<template>
  <el-card class="me-area"
           :body-style="{ padding: '16px' }">
    <div class="me-article-header">
      <a @click="goDetail(id)"
         class="me-article-title">{{title}}</a>
      <el-button v-if="top"
                 class="me-article-icon"
                 type="text">置顶</el-button>
<!--      <span class="me-pull-right me-article-count">-->
<!--        <i class="el-icon-star-off"></i>&nbsp;{{}}-->
<!--      </span>-->
      <span class="me-pull-right me-article-count">
        <i class="el-icon-chat-dot-round"></i>&nbsp;{{ comments }}
      </span>
      <span class="me-pull-right me-article-count">
        <i class="el-icon-collection-tag"/>&nbsp;{{ collects }}
      </span>
      <span class="me-pull-right me-article-count">
        <i class="el-icon-view"></i>&nbsp;{{ view }}
      </span>

    </div>
    <div class="me-article-description">
      {{summary}}
    </div>
    <div class="preImg">
      <router-link :to="{name:'post-detail',params:{id}}">
        <div style="margin-right:30px;width:120px">
          <img v-image-preview :src="attachImg(cover)">
        </div>
      </router-link>
    </div>
    <div class="me-article-footer">
          <span class="me-article-author" @click="personal(userId)">
<!--            <img v-if="v===3" src="@/assets/img/V.png" class="me-article-author-img"/>-->
            <img v-if="avatar" :src="attachImg(avatar)" class="me-article-author-avatar"/>
            <i class="me-icon-author"></i>&nbsp;{{ alias }}
          </span>

      <el-tag v-for="t in tags"
              :key="t.name"
              size="mini"
              type="warning">{{t.name}}</el-tag>
      <div class="me-pull-right me-article-time">
          <span class="me-pull-right me-article-count">
            <i class="el-icon-time"></i>&nbsp;{{ dayjs(createTime).format("YYYY/MM/DD") }}
          </span>
      </div>
    </div>

  </el-card>
</template>

<script>
import {attachImg} from "@/utils/attachImg";

export default {
  name: "ArticleItem",
  props: {
    id: String,
    top: Boolean,
    title: String,
    comments: Number,
    view: Number,
    summary: String,
    alias: String,
    userId: String,
    avatar: String,
    v: Number,
    tags: Array,
    createTime: String,
    cover: String,
    collects: Number,
    // collectCounts: Number,
  },

  data() {
    return {
      attachImg,
    };
  },
  mounted() {

  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'post-detail', params:{id: id} });
    },
    personal(authorId) {
      this.$router.push({ path: `/member/${authorId}/home` });
    },
  },
};
</script>

<style scoped >
.me-article-header {
  /*padding: 10px 18px;*/
  padding-bottom: 10px;
}

.me-article-title {
  font-weight: 600;
}

.me-article-icon {
  padding: 3px 8px;
}

.me-article-count {
  color: #a6a6a6;
  padding-left: 20px;
  font-size: 13px;
}

.me-pull-right {
  float: right;
}

.me-article-description {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 10px;
}
.me-article-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
  cursor: pointer;
}
.me-article-author-img {
  width: 15px;
  height: 15px;
}
.me-article-author-avatar {
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
  border-radius: 50%;
}
.el-tag {
  margin-left: 6px;
}
.me-article-time {
  margin-top: 20px;
}
.leftimg {
  /* width:11%;
  height:11%; */
  width: 100px;
  height: 90px;
  float: left;
  margin-right: 20px;
}
img {
  width: 100%;
  height: 100%;
}
.preImg {
  width: 700px;
  height: 90px;
  margin-bottom: 10px;
  display: flex;
}
</style>