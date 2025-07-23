<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Pokemon } from "../types/pokemon";

const pokemons = ref<Pokemon[]>([]);

const searchQuery = ref<string>("");

const currentPage = ref<number>(1);
const limit = ref<number>(10);
const totalPages = ref<number>(0);

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getPokemon();
  }
};

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getPokemon();
  }
};

const getPokemon = async (): Promise<void> => {
  try {
    const offset = (currentPage.value - 1) * limit.value;

    // @ts-ignore
    const apiURL = import.meta.env.VITE_API_URL;

    const response = await fetch(
      `${apiURL}/pokemon?limit=${limit.value}&offset=${offset}`
    );

    const data = await response.json();

    totalPages.value = Math.ceil(data.count / limit.value);

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const responseDetail = await fetch(pokemon.url);
        const detail = await responseDetail.json();
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: detail.sprites.front_default,
        };
      })
    );

    pokemons.value = pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
};

onMounted(() => {
  getPokemon();
});

const searchPokemon = computed(() => {
  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const pokemonNotFound = computed(() => {
  return searchQuery.value.trim() !== "" && searchPokemon.value.length === 0;
});
</script>

<template>
  <section class="max-w-7xl min-h-screen mx-auto px-5">
    <div class="flex flex-col justify-between items-center">
      <img
        class="flex w-40 h-40 lg:w-52 lg:h-52 md:w-48 md:h-48 object-contain"
        src="../assets/pokeapi.png"
        alt="Pokemon"
      />
    </div>
    <input
      type="text"
      v-model="searchQuery"
      required
      class="input-search"
      placeholder="Search pokemon..."
    />
    <div
      v-if="pokemonNotFound"
      class="min-h-screen flex flex-col justify-center items-center"
    >
      <img
        src="../assets/not-found.svg"
        alt="Not Found"
        class="w-60 h-60 object-contain mx-auto"
      />
      <p class="text-gray-500 text-2xl font-bold">Pokemon not found.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      <div
        v-for="pokemon in searchPokemon"
        :key="pokemon.name"
        class="border rounded-lg p-4 text-center shadow gap-x-4"
      >
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="w-48 h-48 object-content mx-auto mb-2"
        />
        <router-link :to="`/detail-pokemon/${pokemon.name}`">
          <h2 class="text-lg font-semibold mb-5">{{ pokemon.name }}</h2>
        </router-link>
      </div>
    </div>
  </section>
  <div
    class="flex justify-center lg:justify-end md:justify-end sm:justify-center items-center m-5 gap-2"
  >
    <button
      @click="handlePrevPage"
      :class="[
        'btn-detail',
        currentPage === 1
          ? 'flex gap-x-1 items-center bg-gray-400 text-white cursor-no-drop p-3'
          : 'flex gap-x-1 items-center bg-slate-800 text-white p-3',
      ]"
      :disabled="currentPage === 1"
    >
      <Icon icon="flowbite:angle-left-outline" />
      Previous
    </button>
    <span class="text-black font-bold">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button
      @click="handleNextPage"
      :class="[
        'btn-detail',
        currentPage === totalPages
          ? 'flex gap-x-1 items-center bg-gray-400 text-white cursor-no-drop p-3'
          : 'flex gap-x-1 items-center bg-slate-800 text-white p-3',
      ]"
      :disabled="currentPage === totalPages"
    >
      Next
      <Icon icon="flowbite:angle-right-outline" />
    </button>
  </div>
</template>
