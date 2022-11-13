<template>
  <el-backtop :bottom="60" :right="200">
    <div title="回到顶部"
         style="{
        height: 100%;
        width: 100%;
        background-color: lightgray;
        box-shadow: 0 1px 0 0;
        text-align: center;
        line-height: 40px;
        color: #167df0;
        display: block;
        border-radius: 50%;
      }"
    >
      <i class="el-icon-arrow-up"></i>
    </div>
  </el-backtop>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
</style>