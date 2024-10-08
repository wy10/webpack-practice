import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("count", () => {
  const username = ref("loginer2");
  const token = ref("xxxxxx");

  function updateUser() {
    username.value = "loginer2已登录";
  }

  return { username, token, updateUser };
});
