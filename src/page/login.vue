<template>
  <coman />
  <div id="login" @click="gotoPage">这里是登录页面</div>
</template>
<script>
import coman from "./coman.vue";
export default {
  components: {
    coman,
  },
  methods: {
    gotoPage() {
      this.$router.push("/detail");
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../style/style.less");
</style>
