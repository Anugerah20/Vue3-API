<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

// State untuk menyimpan daftar Pokemon
const pokemons = ref<Pokemon[]>([]);

// State untuk pencarian pokemon
const searchQuery = ref<string>("");

// State untuk pagination
const currentPage = ref<number>(1); // Halaman aktif
const limit = ref<number>(10); // Batasan jumlah data per halaman
const totalPages = ref<number>(0); // Total semua halaman

// Function next page pagination
const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getPokemon();
  }
};

// Function previous page pagination
const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getPokemon();
  }
};

// Fungsi untuk fetch data Pokemon dengan URL gambar langsung
const getPokemon = async (): Promise<void> => {
  try {
    // Menghitung offset data pagination
    const offset = (currentPage.value - 1) * limit.value;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${offset}`
    );

    const data = await response.json();

    totalPages.value = Math.ceil(data.count / limit.value);

    // Fetch detail pokemon untuk mendapatkan URL Gambar
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

    // console.log(pokemonDetails);

    pokemons.value = pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
};

// Fetch data saat komponen dimuat
onMounted(() => {
  getPokemon();
});

// Search Pokemon by name
const searchPokemon = computed(() => {
  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <section class="max-w-7xl mx-auto mb-10 px-5">
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
    <!-- Daftar Pokemon -->
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
    <div class="flex justify-end items-center mt-5 gap-5">
      <button
        @click="handlePrevPage"
        :class="[
          'btn-detail',
          currentPage === 1
            ? 'flex gap-x-1 items-center bg-gray-400 text-white cursor-no-drop'
            : 'flex gap-x-1 items-center bg-slate-800 text-white',
        ]"
        :disabled="currentPage === 1"
      >
        <Icon icon="flowbite:angle-left-outline" />
        Prev
      </button>
      <span class="text-black font-bold">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="handleNextPage"
        :class="[
          'btn-detail',
          currentPage === totalPages
            ? 'flex gap-x-1 items-center bg-gray-400 text-white cursor-no-drop'
            : 'flex gap-x-1 items-center bg-slate-800 text-white',
        ]"
        :disabled="currentPage === totalPages"
      >
        Next
        <Icon icon="flowbite:angle-right-outline" />
      </button>
    </div>
  </section>
</template>
