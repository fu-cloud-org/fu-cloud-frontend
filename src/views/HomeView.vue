<template>
  <div class="container">
    <div class="box"> <i class="el-icon-bell" style="font-size: 20px"/>&nbsp; {{billboard.content}} </div>
    <div class="columns">
      <div class="column is-three-quarters">
        <post-list/>
      </div>
      <div class="column">
        <card-bar/>
      </div>
    </div>
    <el-button
        v-if="token != null && token !== ''"
        type="primary"
        icon="el-icon-edit"
        circle class="release-btn"
        @click="goRelease"
    />
      <el-button
          v-else
          type="primary"
          icon="el-icon-edit"
          circle class="release-btn"
          @click="goRelease"
          disabled
      />
  </div>
</template>

<script>
// @ is an alias to /src

import {getBillbooard} from "@/api/billboard";
import PostList from "@/views/post/PostList";
import CardBar from "@/views/card/CardBar";
import {mapGetters} from "vuex";

export default {
  name: 'HomeView',
  components: { CardBar, PostList},
  computed: {
    ...mapGetters([
        'token'
    ])
  },
  data () {
    return {
      billboard: {
        content: ''
      }
    }
  },
  created() {
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillbooard().then(value => {
        const {data} = value;
        this.billboard = data;
      })
    },
    goRelease() {
      this.$router.push('/post/release')
    }
  },
  watch: {
    token: function (newVal, oldVal) {
        history.go(0);
    }
  }
}
</script>

<style scoped>
.release-btn {
  position: fixed;
  bottom: 120px;
  right: 100px;
  z-index: 1000;
}
</style>