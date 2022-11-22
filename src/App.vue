<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
html, body, #app {
  height: 100%;
}

</style>
