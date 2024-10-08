import { createWebHashHistory, createRouter } from "vue-router";

import Login from "./login.vue";
import Detail from "./detail.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/detail", component: Detail },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
