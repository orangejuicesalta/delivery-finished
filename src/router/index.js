import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/login-page.vue";
const routes = [
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../components/main-user-page.vue"),
    redirect: {
      name: "orders",
    },
    children: [
      {
        path: "/main/new_orders",
        name: "orders",
        component: () => import("../components/orders-list.vue"),
      },
      {
        path: "/order/:id",
        name: "order",
        component: () => import("/src/components/order-details-page.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
