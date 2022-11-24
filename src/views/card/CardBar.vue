<template>
  <div>
    <self
        :user="self"
         v-show="token"
    />

    <tip/>

    <promotion/>
  </div>
</template>

<script>
import Tip from "@/views/card/Tip";
import Promotion from "@/views/card/Promotion";
import WelcomeLogin from "@/views/card/WelcomeLogin";
import Self from "@/views/card/Self";
import {mapGetters} from "vuex";
import {getUserProfile} from "@/api/auth";
export default {
  name: "cardBar",
  components: {Self, WelcomeLogin, Promotion, Tip},
  data() {
    return {
      self: {
        type: Object,
        default: null
      },
    }
  },
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  created() {
    if(this.token !== '' && this.token != null){
      this.init();
    }
  },
  methods: {
    async init() {
      getUserProfile(this.user.id).then(res => {
        const {data} = res
        this.self = data
      })
    },
  },
  watch: {
    token: function (newVal, oldVal) {
      if(newVal !== '' && newVal != null){
        this.init();
      }
    }
  }
}
</script>

<style scoped>

</style>