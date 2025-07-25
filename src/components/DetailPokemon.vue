<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { DetailPokemon } from "../types/pokemon";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { useDarkModeStore } from "../stores/darkModeStore";
import "swiper/css/navigation";
import "swiper/css";

// Dark mode store
const darkModeStore = useDarkModeStore();

const route = useRoute();
const router = useRouter();

const detailPokemonName = ref<string>(route.params.name as string);
const pokemonDetail = ref<DetailPokemon | null>(null);
const images = ref<string[]>([]);

const fetchPokemonDetail = async (): Promise<void> => {
  // @ts-ignore
  const apiURL = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(
      `${apiURL}/pokemon/${detailPokemonName.value}`
    );
    const data = await response.json();
    pokemonDetail.value = data;

    images.value = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ].filter(Boolean);

    console.log("Detail pokemon", data);
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
};

onMounted(() => {
  // Initialize dark mode
  darkModeStore.initialize();
  fetchPokemonDetail();
});
</script>
<template>
  <div class="flex flex-col justify-center items-center mx-5">
    <template v-if="pokemonDetail">
      <section class="max-w-8xl p-10 h-max mt-10 border-2 rounded-md">
        <div class="w-60 mx-auto mb-6">
          <Swiper
            :spaceBetween="20"
            :slidesPerView="1"
            :modules="[Navigation]"
            navigation
            loop
            class="rounded-md bg-gray-100 dark:bg-gray-600"
          >
            <SwiperSlide v-for="(img, index) in images" :key="index">
              <img
                :src="img"
                :alt="`Image ${index}`"
                class="w-full h-40 object-contain"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="text-center mb-5">
          <h1 class="text-2xl font-bold capitalize">
            {{ pokemonDetail.name }}
          </h1>
        </div>
        <div class="flex flex-wrap flex-col justify-between">
          <div class="flex justify-between flex-wrap">
            <p class="font-bold flex flex-col">Types :</p>
            <p class="font-bold flex flex-col">Abilities :</p>
          </div>
          <div class="flex flex-wrap justify-between my-2">
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
          <div class="flex justify-between text-center">
            <div>
              <p class="font-bold">Height :</p>
              <p class="text-md">{{ pokemonDetail.height }}</p>
            </div>
            <div>
              <p class="font-bold">Weight :</p>
              <p class="text-md">{{ pokemonDetail.weight }}</p>
            </div>
          </div>
        </div>
      </section>
      <div class="mb-2">
        <a
          href="/"
          class="p-4 mb-2 rounded bg-gray-300 text-black focus:font-bold"
          @click.prevent="router.back()"
        >
          Back Home
        </a>
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
