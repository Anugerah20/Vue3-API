<script lang="ts">
import { defineComponent } from "vue";

interface Users {
  name: string;
  age: number;
  action: Function;
}

export default defineComponent<Users>({
  props: {
    name: String,
    age: Number,
    action: Function,
  },
});
</script>

<template>
  <section>
    <div class="card">
      <h1>Nama: {{ $props.name }}</h1>
      <h2>Usia: {{ $props.age }}</h2>
      <button @click="$props.action($props.name, $props.age)">
        Detail user
      </button>
    </div>
  </section>
</template>

<style scoped>
.card {
  border: 2px solid white;
}
</style>
