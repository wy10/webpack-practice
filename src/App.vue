<template>
  <Login :text="text" @gotoPage="gotoPage"></Login>
</template>
<script setup>
import { ref } from "vue";
import Login from "./page/login.vue";
const text = ref("这里是登录页面");
const gotoPage = (val) => {
  text.value = val;
};
</script>
