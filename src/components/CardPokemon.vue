<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

// State untuk menyimpan daftar Pokemon
const pokemons = ref<Pokemon[]>([]);

// Fungsi untuk fetch data Pokemon dengan URL gambar langsung
const getPokemon = async (): Promise<void> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await response.json();

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

    console.log(pokemonDetails);

    pokemons.value = pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
};

// Fetch data saat komponen dimuat
onMounted(() => {
  getPokemon();
});
</script>

<template>
  <section class="max-w-7xl mx-auto mb-10 px-5">
    <div class="flex flex-col justify-between items-center">
      <img
        class="flex w-48 h-48 object-contain"
        src="../assets/pokeapi.png"
        alt="Pokemon"
      />
    </div>
    <input
      type="text"
      required
      class="input-search"
      placeholder="Search pokemon..."
    />
    <!-- Daftar Pokemon -->
    <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        class="border rounded-lg p-4 text-center shadow gap-x-4"
      >
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="w-48 h-48 object-content mx-auto mb-2"
        />
        <h2 class="text-lg font-semibold">{{ pokemon.name }}</h2>
      </div>
    </div>
  </section>
</template>
