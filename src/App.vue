<template>
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>


    <router-view :key="this.$route.fullPath"></router-view>


    <div>

    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";

export default {
  name: "App",
  components: { Header },
};
</script>

<style>
.container {
  min-height: 500px;
}
</style>
