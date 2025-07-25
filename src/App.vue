<script setup lang="ts">
import { onMounted } from "vue";
import { useDarkModeStore } from "./stores/darkModeStore";

const darkModeStore = useDarkModeStore();

onMounted(() => {
  darkModeStore.initialize();
});
</script>

<template>
  <router-view></router-view>
</template>
