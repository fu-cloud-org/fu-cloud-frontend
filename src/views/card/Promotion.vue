<template>
  <el-card class="box-card">
    <div slot="header">
      <i class="el-icon-s-promotion"></i> &nbsp;
      <span>推广链接</span>
    </div>
    <div>
      <p v-for="(item, index) in promotionList" :key="index" class="block">
        <i class="el-icon-paperclip"></i>
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </p>
    </div>
  </el-card>
</template>

<script>
import {getPromotionList} from "@/api/promotion";

export default {
  name: "Promotion",
  data() {
    return {
      promotionList: []
    }
  },
  created() {
    this.fetchPromotionList();
  },
  methods: {
    async fetchPromotionList() {
      getPromotionList().then(response => {
        const {data} = response;
        this.promotionList = data;
      })
    }
  }
}
</script>

<style scoped>

</style>