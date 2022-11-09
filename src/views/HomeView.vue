<template>
  <div>
    <div class="box"> {{billboard.content}} </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {getBillbooard} from "@/api/billboard";

export default {
  name: 'HomeView',
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
