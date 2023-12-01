import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import MatchesView from "../views/home/MatchesView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/matches",
    name: "matches",
    component: MatchesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
