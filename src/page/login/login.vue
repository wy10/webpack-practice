<template>
  <UserInfo />
  <div id="login" class="login">
    <div>登录0 {{ formatDate() }} {{ store.username }}</div>
    <el-button type="primary" @click="gotoDetail">登录</el-button>
  </div>
  <img src="../utils/center-shadow.png" style="width: 50px; height: 50px" />
</template>
<script setup>
import { ElButton } from "element-plus";
import { useRouter } from "vue-router";
import UserInfo from "./user-info.vue";
import { formatDate } from "../utils/formatDate";
import { useUserStore } from "./store";
const emits = defineEmits(["login"]);
const router = useRouter();
const store = useUserStore();

const gotoDetail = () => {
  store.updateUser();
  router.push({
    path: "/detail",
    query: {
      id: 1,
    },
  });
};
</script>
<style lang="less" scoped>
@import url(./login.less);
@import url(../utils/index.less);
</style>
