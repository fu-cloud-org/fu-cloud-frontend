<template>
  <div class="myArticle" style="padding: 10px">
    <article-item v-for="a in allData" :key="a.id" v-bind="a"/>
    <el-empty
        v-if="allData.length === 0"
        :image-size="250"
        description="暂未发表任何帖子额"
    ></el-empty>
  </div>
</template>

<script>
import {getMyPosts} from "@/api/personal";
import ArticleItem from "@/views/user/ArticleItem.vue";
export default {
  components: { ArticleItem },
  name: "MyArticle",
  data() {
    return {
      allData:[]
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      getMyPosts(this.$route.params.id)
          .then((res) => {
            console.log(res);
            this.allData=res.data
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
};
</script>

<style>
.myArticle{
  line-height: 30px;
}
</style>
