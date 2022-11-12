<template>
  <div>
    <div class="mb-5">
      <Header/>
    </div>
    <div class="main-container">
      <div class="body-wrap">
        <Swiper/>
        <router-view :key="this.$route.fullPath"></router-view>
      </div>
      <Footer id="footer"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Swiper from "@/components/Swiper";

export default {
  name: "App",
  components: {Swiper, Footer, Header },
};
</script>

<style>
.main-container {
  position: relative;
  min-height: 100vh;
}
.body-wrap {
  padding-bottom: 2.5rem;
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
}
</style>
