<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios  from "axios";

let data = ref("");

onMounted(async () => {
  const response = await axios.get(
      "https://127.0.0.1:8000/api/movies",
      {
        headers: {
          Accept: "application/json",
        },
      }
  );
  data.value = response.data;
  console.log(toRaw(data.value));
});
</script>

<template>
  <header class="header-home">
    <h1>ACCUEIL</h1>
  </header>
  <div v-for="film in data">{{ film.title }} / {{ film.releaseDate }} / {{ film.description }} / {{ film.duration }}</div>

</template>

<style scoped>

</style>