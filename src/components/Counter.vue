<script setup lang="ts">
import { ref } from "vue";

const count = ref<number>(0);

const increment = (): void => {
  count.value++;
};

const decrement = (): void => {
  if (count.value > 0) {
    count.value--;
  }
};
</script>

<template>
  <h1>Hello Vue JS</h1>
  <p>Count: {{ count }}</p>
  <button @click="increment">Tambah</button>
  <button @click="decrement">Kurang</button>
</template>

<style scoped></style>
