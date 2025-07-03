<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { DetailPokemon } from "../types/pokemon";

const route = useRoute();
const router = useRouter();
const detailPokemonName = ref<string>(route.params.name as string);

const pokemonDetail = ref<DetailPokemon | null>(null);

const fetchPokemonDetail = async (): Promise<void> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${detailPokemonName.value}`
    );
    const data = await response.json();
    pokemonDetail.value = data;
    console.log("Detail pokemon", data);
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
};

onMounted(() => {
  fetchPokemonDetail();
});
</script>
<template>
  <div class="flex flex-col justify-center items-center mx-5">
    <template v-if="pokemonDetail">
      <section class="max-w-8xl p-20 h-max mt-10 border-2 rounded-md">
        <div class="text-center">
          <img
            :src="pokemonDetail.sprites.front_default"
            :alt="pokemonDetail.name"
            class="w-40 h-40 mx-auto"
          />
          <h1 class="text-2xl font-bold mb-5">{{ pokemonDetail.name }}</h1>
        </div>
        <div class="flex flex-col justify-between">
          <div class="flex justify-between flex-wrap">
            <p class="font-bold flex flex-col">Types :</p>
            <p class="font-bold flex flex-col">Abilities :</p>
          </div>
          <div class="flex justify-between my-2">
            <ul class="flex flex-col flex-wrap">
              <li v-for="type in pokemonDetail.types" :key="type.type.name">
                {{ type.type.name }}
              </li>
            </ul>
            <ul class="flex flex-wrap flex-col">
              <li
                v-for="ability in pokemonDetail.abilities"
                :key="ability.ability.name"
              >
                {{ ability.ability.name }}
              </li>
            </ul>
          </div>
          <div class="flex justify-between items-center gap-4 my-2">
            <p class="font-bold flex-wrap flex-col">Height :</p>
            <span class="flex flex-col flex-wrap">{{
              pokemonDetail.height
            }}</span>
            <p class="font-bold">Weight :</p>
            <span class="flex flex-col flex-wrap">{{
              pokemonDetail.weight
            }}</span>
          </div>
        </div>
      </section>
      <div class="mb-2">
        <a
          href="/"
          class="p-4 mb-2 rounded bg-gray-300 text-black focus:font-bold"
          @click="router.back()"
          >Back Home</a
        >
      </div>
    </template>
    <template v-else>
      <section class="flex justify-center items-center min-h-screen">
        <div class="text-center animate-spin">
          <Icon
            icon="mdi:loading"
            class="text-6xl text-blue-500"
            width="64"
            height="64"
          />
        </div>
      </section>
    </template>
  </div>
</template>
