<template>
  <div class="swiper-container">
    <el-carousel :interval="4000" type="card" height="=280px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {swiperList} from "@/enums/swiper";

export default {
  name: "Swiper",
  data() {
    return {
      swiperList: []
    }
  },
  created() {
    this.swiperList = swiperList;
  }
}
</script>

<style lang="scss" scoped>

.swiper-container{
  width: 60%;
  margin: auto;
  padding-top: 40px;
  img {
    width: 100%;
  }
}

.swiper-container:deep(.el-carousel__indicators.el-carousel__indicators--outside) {
  display: inline-block;
  transform: translateX(30vw);
}

</style>