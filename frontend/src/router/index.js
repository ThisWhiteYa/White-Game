/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
// import { routes } from 'vue-router/auto-routes'
import Login from "@/pages/login.vue";
import Loading from "@/pages/loading.vue";
import Auth from "@/pages/auth.vue";
import Home from "@/pages/home.vue";
import mainpage from "@/pages/index.vue";
const routes = [
  {
    path: "",
    name: "main",
    component: mainpage,
    children: [
      { path: "", redirect: "/login" },
      { path: "/login", name: "login", component: Login },
      { path: "/home", name: "home", component: Home },
      { path: "/auth", name: "auth", component: Auth },
      { path: "/loading", name: "loading", component: Loading },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const onLogin = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("onLogin="))
//     ?.split("=")[1];
//   const username = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("username="))
//     ?.split("=")[1];
//   console.log("onLogin :", !!onLogin);
//   console.log("username :", !!username);
//   if (!onLogin && !username) {
//     console.log("login");
//     next({ name: "home" });
//   } else if (to.name !== "Login" && !onLogin && username) {
//     console.log("auth");
//     next({ name: "auth" });
//   } else {
//     next();
//   }
// });

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
