<template>
  <div>
    <welcome-login/>

    <tip/>

    <promotion/>
  </div>
</template>

<script>
import Tip from "@/views/card/Tip";
import Promotion from "@/views/card/Promotion";
import WelcomeLogin from "@/views/card/WelcomeLogin";
export default {
  name: "cardBar",
  components: {WelcomeLogin, Promotion, Tip}
}
</script>

<style scoped>

</style>