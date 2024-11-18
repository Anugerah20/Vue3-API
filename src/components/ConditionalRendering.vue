<script setup lang="ts">
import { ref } from "vue";

//  v-show, v-if, v-else, v-else-if
// const show = ref<boolean>(true);

// const toggleShow = (): void => {
//   show.value = !show.value;
// };

// v-for
let fruits = ref<string[]>(["apple", "banana", "mango", "melon"]);
</script>
<template>
  <!-- ? v-show -->
  <!-- ? v-if, v-if-else, v-if-else if -->
  <!-- ? v-for -->
  <div>
    <!-- ? v-show -->
    <!-- <h1 v-show="show">Hello vue 😊</h1>
    <button @click="toggleShow">klik</button> -->

    <!-- ? v-if, v-else, v-if-else -->
    <!-- <h1 v-if="show">ini adalah v-if</h1>
    <h1 v-else-if="show === null">ini adalah v-else-if</h1>
    <h1 v-else>ini adalah v-else</h1>
    <button @click="toggleShow">klik</button> -->

    <!-- ? v-for -->
    <ul>
      <li v-for="fruit in fruits" :key="fruit">
        {{ fruit }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
