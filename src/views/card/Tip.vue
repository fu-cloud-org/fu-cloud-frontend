<template>
  <el-card class="box-card">
    <div slot="header">
      <i class="el-icon-coin" style="font-size: 20px"></i> &nbsp
      <span>每日赠言</span>
    </div>
    <div>
      <div class="has-text-left block">
        {{ tip.content }}
      </div>
      <div class="has-text-right mt-5 block">
        ——{{ tip.author }}
      </div>
    </div>
  </el-card>
</template>

<script>
import {getDailyTip} from "@/api/tip";

export default {
  name: "Tip",
  data() {
    return {
      tip: {}
      }
  },
  created() {
    this.fetchDailyTip();
  },
  methods: {
    async fetchDailyTip() {
      getDailyTip().then(response => {
        const {data} = response;
        this.tip = data;
      })
    }
  }
}
</script>

<style scoped>

</style>