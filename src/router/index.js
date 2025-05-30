import { createRouter, createWebHistory } from "vue-router";
import SignUpView from "@/views/SignUpView.vue";
import LogInView from "@/views/LogInView.vue";
import UserView from "@/views/UserView.vue";

const routes = [
  {
    path: "/",
    component: SignUpView,
  },
  {
    path: "/login",
    component: LogInView,
  },
  {
    path: "/home",
    component: UserView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
