<script setup>
import CardMovie from "@/components/CardMovie.vue";
import axios from "axios";
import { ref } from "vue";

const token = localStorage.getItem('token');
let data = ref("");

const getMovies = () => {
  const apiUrl = 'https://127.0.0.1:8000/api/movies?page=1';

  axios.get(apiUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
      .then(response => {
        data.value = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la requête API :', error);
      });

}
getMovies()
</script>

<template>
  <div class="cards-container">
    <card-movie
        v-for="film in data"
        :key="film.id"
        :film="film"
    />
  </div>
</template>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
