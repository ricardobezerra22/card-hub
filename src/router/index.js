/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import RequestedCards from "@/components/MainPage/Partials/RequestedCards/RequestedCards.vue";
import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/requested-cards",
      name: "requested",
      component: RequestedCards,
    },
  ],
});

export default router;
