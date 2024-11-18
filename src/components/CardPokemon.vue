<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Pokemon {
  name: string;
  image: string;
}

// State untuk menyimpan daftar Pokemon
const pokemons = ref<Pokemon[]>([]);

// Fungsi untuk fetch data Pokemon dengan URL gambar langsung
const getPokemon = async (): Promise<void> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();

    // Map data untuk menyertakan gambar dengan ID dari URL
    pokemons.value = data.results.map(
      (pokemon: { name: string; url: string }) => {
        const id = pokemon.url.split("/").slice(-2, -1)[0]; // Ambil ID dari URL
        return {
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      }
    );
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
  <section class="max-w-7xl mx-auto mb-10">
    <div class="flex flex-col justify-between items-center">
      <img
        class="flex w-48 h-48 object-contain"
        src="../assets/pokeapi.png"
        alt="Pokemon"
      />
    </div>
    <!-- Daftar Pokemon -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        class="border rounded-lg p-4 text-center shadow"
      >
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="w-24 h-24 mx-auto mb-2"
        />
        <h2 class="text-lg font-semibold">{{ pokemon.name }}</h2>
      </div>
    </div>
  </section>
</template>
