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
  <div class="flex flex-col justify-center items-center mx-5">
    <section
      v-if="pokemonDetail"
      class="max-w-4xl p-10 mt-10 border-2 rounded-md"
    >
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
        <div class="flex justify-center items-center gap-4 my-2">
          <p class="font-bold">Height :</p>
          <span>{{ pokemonDetail.height }}</span>
          <p class="font-bold">Weight :</p>
          <span>{{ pokemonDetail.weight }}</span>
        </div>
        <div class="flex justify-between flex-wrap">
          <p class="font-bold flex flex-col">Types :</p>
          <p class="font-bold flex">Abilities :</p>
        </div>
        <div class="flex justify-between my-2">
          <ul class="flex flex-col">
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
      </div>
    </section>
    <section v-else class="flex justify-center items-center min-h-screen">
      <p class="text-center animate-bounce">Loading...</p>
    </section>
  </div>
</template>
