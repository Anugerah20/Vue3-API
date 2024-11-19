import { createRouter, createWebHistory } from "vue-router";
import CardPokemon from "../components/CardPokemon.vue";
import DetailPokemon from "../components/DetailPokemon.vue";

const routes = [
  { path: "/", name: "Home", component: CardPokemon },
  { path: "/pokemon/:name", name: "Detail", component: DetailPokemon },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
