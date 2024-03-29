import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";

import MatchesView from "../views/home/MatchesView.vue";
import StaduimsView from "../views/home/StaduimsView.vue";

import EditProfileView from "../views/user/EditProfileView.vue";

import ReservationView from "../views/home/ReservationView.vue";

import UsersView from "../views/admin/UsersView.vue";
import RequestsView from "../views/admin/RequestsView.vue";

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
    alias: "/",
    component: MatchesView,
  },
  {
    path: "/staduims",
    name: "staduims",
    alias: "/",
    component: StaduimsView,
  },
  {
    path: "/reservation",
    name: "reservation",
    alias: "/",
    component: ReservationView,
  },
  {
    path: "/edit-profile",
    name: "edit-profile",
    component: EditProfileView,
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
  },
  {
    path: "/requests",
    name: "requests",
    component: RequestsView,
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
