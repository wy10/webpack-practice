import { createWebHashHistory, createRouter } from "vue-router";

// import Login from "./login.vue";
// import Detail from "./detail.vue";

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "login" */ "./login.vue"),
  },
  {
    path: "/detail",
    component: () => import(/* webpackChunkName: "detail" */ "./detail.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
