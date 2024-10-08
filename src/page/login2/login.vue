<template>
  <div id="login" class="login" @click="gotoDetail">
    登录2 {{ store.username }}
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
// import { formatDate } from "../utils/formatDate";
import { useUserStore } from "./store";
const emits = defineEmits(["login"]);
const router = useRouter();
const store = useUserStore();

const gotoDetail = () => {
  store.updateUser();
  router.push({
    path: "/detail",
    query: {
      id: 2,
    },
  });
};
</script>
<style lang="less" scoped>
@import url(../utils/index.less);
</style>
