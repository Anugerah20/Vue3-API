<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-2xl font-bold text-black">404 | Page Not Found</h1>
    <p class="text-gray-400 mt-1 text-sm">
      The page you're looking for doesn't exist has been moved.
    </p>
    <router-link :to="`/`">
      <h2 class="text-sm font-semibold mt-2 underline">Back to home</h2>
    </router-link>
  </div>
</template>
