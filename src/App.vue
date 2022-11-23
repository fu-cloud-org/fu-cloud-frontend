<template>
  <div id="app" v-if="isRouterAlive">
    <keep-alive>
      <router-view :key="$route.fullPath"/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style>
html, body, #app {
  height: 100%;
}

</style>
