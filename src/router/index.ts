import { createRouter, createWebHistory } from "vue-router";
import CardPokemon from "../components/CardPokemon.vue";
import DetailPokemon from "../components/DetailPokemon.vue";

const routes = [
  {
    path: "/",
    name: "CardPokemon",
    component: CardPokemon,
  },
  {
    path: "/detail-pokemon/:name",
    name: "DetailPokemon",
    component: DetailPokemon,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
