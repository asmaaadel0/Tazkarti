import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import MatchesView from "../views/home/MatchesView.vue";
import EditProfileView from "../views/user/EditProfileView.vue";

import NotFound from "../views/NotFound.vue";
import InternalServerError from "../views/InternalServerError.vue";

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
  {
    path: "/edit-profile",
    name: "edit-profile",
    component: EditProfileView,
  },
  {
    path: "/enternal-server-error",
    name: "enternal-server-error",
    component: InternalServerError,
  },
  {
    path: "/:notFound(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
