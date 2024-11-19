<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const pokemonDetail = ref<any>(null);

const fetchPokemonDetail = async (name: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    pokemonDetail.value = await response.json();
  } catch (error) {
    console.error("Error fetching Pokemon detail:", error);
  }
};

onMounted(() => {
  console.log("Route params:", route.params);
  const name = route.params.name as string;
  console.log("Fetching details for:", name);
  fetchPokemonDetail(name);
});
</script>

<template>
  <section class="max-w-lg mx-auto text-center mt-10">
    <button
      @click="router.push('/')"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-5"
    >
      Back
    </button>
    <div v-if="pokemonDetail">
      <img
        :src="pokemonDetail.sprites.front_default"
        :alt="pokemonDetail.name"
        class="w-48 h-48 object-contain mx-auto"
      />
      <h2 class="text-2xl font-bold">{{ pokemonDetail.name }}</h2>
      <p class="text-gray-700">Height: {{ pokemonDetail.height }}</p>
      <p class="text-gray-700">Weight: {{ pokemonDetail.weight }}</p>
    </div>
  </section>
</template>
