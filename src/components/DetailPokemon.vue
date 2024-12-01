<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface DetailPokemon {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  abilities: { ability: { name: string } }[];
}

// Ambil route dan router dan nama pokemon
const route = useRoute();
const router = useRouter();
const detailPokemonName = ref<string>(route.params.name as string);

// Debugging
// console.log("Pokemon Name from Route:", detailPokemonName.value);

const pokemonDetail = ref<DetailPokemon | null>(null);

// Fungsi untuk fetch detail Pokemon
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

// Jalankan saat komponen dimuat
onMounted(() => {
  fetchPokemonDetail();

  // Debugging route params
  // console.log("Route params:", route.params);
});
</script>
<template>
  <section v-if="pokemonDetail" class="max-w-4xl mx-auto p-2 mt-10 border-2">
    <a href="/" class="underline focus:font-bold" @click="router.back()"
      >Back to Home</a
    >
    <div class="text-center">
      <img
        :src="pokemonDetail.sprites.front_default"
        :alt="pokemonDetail.name"
        class="w-40 h-40 mx-auto"
      />
      <h1 class="text-2xl font-bold mb-5">{{ pokemonDetail.name }}</h1>
    </div>
    <div class="flex flex-wrap flex-col justify-center">
      <div class="flex justify-center items-center gap-x-5 my-2">
        <p><strong>Height:</strong> {{ pokemonDetail.height }}</p>
        <p><strong>Weight:</strong> {{ pokemonDetail.weight }}</p>
      </div>
      <div class="flex justify-center items-center gap-x-5 my-2">
        <p><strong>Types:</strong></p>
        <ul class="flex flex-col">
          <li v-for="type in pokemonDetail.types" :key="type.type.name">
            {{ type.type.name }}
          </li>
        </ul>
        <p><strong>Abilities:</strong></p>
        <ul class="flex flex-col">
          <li
            v-for="ability in pokemonDetail.abilities"
            :key="ability.ability.name"
          >
            {{ ability.ability.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
  <p class="text-center" v-else>Loading...</p>
</template>
