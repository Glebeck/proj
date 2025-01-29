import { createRouter, createWebHistory } from "vue-router";
import FavoritePage from "@/views/FavoritePage.vue";
import Purchase from "@/views/Purchase.vue";
import Cart from "@/views/Cart.vue";

import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  
  {
    path: "/favorite",
    name: "favorite-page",
    component: FavoritePage,
  },
  {
    path: "/purchase",
    name: "purchase-page",
    component: Purchase,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
