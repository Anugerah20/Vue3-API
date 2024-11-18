<script setup lang="ts">
import { ref } from "vue";
// import Counter from "./components/Counter.vue";
// import ConditionalRendering from "./components/ConditionalRendering.vue";

// Menyimpan data user didalam object
let dataUsers = ref([
  {
    name: "Nabil",
    age: 22,
  },
  {
    name: "Fajar",
    age: 32,
  },
  {
    name: "Adit",
    age: 15,
  },
]);

function detailUser(name: string, age: number) {
  alert(`Nama: ${name} | Usia: ${age}`);
}

import Card from "./components/Card.vue";
</script>

<template>
  <!-- <Counter /> -->
  <!-- <ConditionalRendering /> -->

  <Card
    v-for="data in dataUsers"
    :key="data.name"
    :name="data.name"
    :age="data.age"
    :action="detailUser"
  />
</template>

<style scoped></style>
