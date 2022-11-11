<template>
  <div class="container">
    <div class="box"> <i class="el-icon-bell" style="font-size: 20px"/>&nbsp; {{billboard.content}} </div>
    <div class="columns">
      <div class="column is-three-quarters">
        <topic-list-view/>
      </div>
      <div class="column">
        <card-bar/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {getBillbooard} from "@/api/billboard";
import TopicListView from "@/views/post/Index";
import CardBar from "@/views/card/CardBar";

export default {
  name: 'HomeView',
  components: {CardBar, TopicListView},
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
    }
  },
}
</script>
