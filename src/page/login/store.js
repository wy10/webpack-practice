import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("count", () => {
  const username = ref("loginer0");
  const token = ref("xxxxxx");

  function updateUser() {
    username.value = "loginer0已登录";
  }

  return { username, token, updateUser };
});
