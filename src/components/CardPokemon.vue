<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Pokemon } from "../types/pokemon";
import { useDarkModeStore } from "../stores/darkModeStore";

// Dark mode store
const darkModeStore = useDarkModeStore();

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
  // Initialize dark mode
  darkModeStore.initialize();
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

// Computed styles fallback if Tailwind doesn't work
const mainBgStyle = computed(() => ({
  backgroundColor: darkModeStore.darkMode ? "#111827" : "#ffffff",
  color: darkModeStore.darkMode ? "#f9fafb" : "#1f2937",
  minHeight: "100vh",
  transition: "all 0.3s ease",
}));

const cardBgStyle = computed(() => ({
  backgroundColor: darkModeStore.darkMode ? "#1f2937" : "#ffffff",
  borderColor: darkModeStore.darkMode ? "#374151" : "#e5e7eb",
  color: darkModeStore.darkMode ? "#f9fafb" : "#1f2937",
}));

const inputBgStyle = computed(() => ({
  backgroundColor: darkModeStore.darkMode ? "#1f2937" : "#ffffff",
  borderColor: darkModeStore.darkMode ? "#374151" : "#d1d5db",
  color: darkModeStore.darkMode ? "#f9fafb" : "#1f2937",
}));
</script>

<template>
  <div
    class="min-h-screen transition-all duration-300"
    :class="[
      darkModeStore.darkMode
        ? 'bg-gray-900 text-white'
        : 'bg-white text-gray-900',
    ]"
    :style="mainBgStyle"
  >
    <button
      @click="darkModeStore.toggleDarkMode"
      class="fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      :class="[
        darkModeStore.darkMode
          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
          : 'bg-gray-800 text-white hover:bg-gray-700',
      ]"
      :aria-label="
        darkModeStore.darkMode ? 'Switch to light mode' : 'Switch to dark mode'
      "
    >
      <Icon
        :icon="darkModeStore.darkMode ? 'ph:sun-bold' : 'ph:moon-bold'"
        class="w-6 h-6"
      />
    </button>

    <section class="max-w-7xl min-h-screen mx-auto px-5">
      <div class="flex flex-col justify-between items-center pt-8">
        <img
          class="flex w-40 h-40 lg:w-52 lg:h-52 md:w-48 md:h-48 object-contain"
          src="../assets/pokeapi.png"
          alt="Pokemon"
        />
      </div>
      <div class="flex justify-center my-8">
        <div class="relative w-full max-w-md">
          <Icon
            icon="ph:magnifying-glass-bold"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            :class="[
              darkModeStore.darkMode ? 'text-gray-400' : 'text-gray-500',
            ]"
          />
          <input
            type="text"
            v-model="searchQuery"
            required
            class="w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20"
            :class="[
              darkModeStore.darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
            ]"
            :style="inputBgStyle"
            placeholder="Search pokemon..."
          />
        </div>
      </div>

      <div
        v-if="pokemonNotFound"
        class="min-h-screen flex flex-col justify-center items-center"
      >
        <img
          src="../assets/not-found.svg"
          alt="Not Found"
          class="w-60 h-60 object-contain mx-auto"
        />
        <p
          class="text-2xl font-bold mt-4"
          :class="[darkModeStore.darkMode ? 'text-gray-400' : 'text-gray-500']"
        >
          Pokemon not found.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
        <div
          v-for="pokemon in searchPokemon"
          :key="pokemon.name"
          class="rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl border"
          :class="[
            darkModeStore.darkMode
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
              : 'bg-white border-gray-200 hover:bg-gray-50',
          ]"
          :style="cardBgStyle"
        >
          <div
            class="rounded-lg p-4 mb-4 mx-auto w-fit"
            :class="[darkModeStore.darkMode ? 'bg-gray-700' : 'bg-gray-100']"
          >
            <img
              :src="pokemon.image"
              :alt="pokemon.name"
              class="w-32 h-32 lg:w-40 lg:h-40 object-contain mx-auto"
            />
          </div>

          <router-link
            :to="`/detail-pokemon/${pokemon.name}`"
            class="block hover:no-underline transition-colors duration-300"
            :class="[darkModeStore.darkMode ? 'text-white' : 'text-gray-900']"
          >
            <h2 class="text-lg font-semibold capitalize">
              {{ pokemon.name }}
            </h2>
          </router-link>
        </div>
      </div>
    </section>

    <div
      class="flex justify-center lg:justify-end md:justify-end sm:justify-center items-center px-5 pb-8 gap-4"
    >
      <button
        @click="handlePrevPage"
        :disabled="currentPage === 1"
        class="flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300"
        :class="[
          currentPage === 1
            ? darkModeStore.darkMode
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg',
        ]"
      >
        <Icon icon="flowbite:angle-left-outline" class="w-4 h-4" />
      </button>

      <span
        class="font-bold px-4 py-2 rounded-lg"
        :class="[
          darkModeStore.darkMode
            ? 'bg-gray-800 text-gray-200'
            : 'bg-gray-100 text-gray-700',
        ]"
      >
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
        @click="handleNextPage"
        :disabled="currentPage === totalPages"
        class="flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300"
        :class="[
          currentPage === totalPages
            ? darkModeStore.darkMode
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg',
        ]"
      >
        <Icon icon="flowbite:angle-right-outline" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
