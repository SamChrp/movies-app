<script setup>
import CardActor from "@/components/CardActor.vue";
import axios from "axios";
import { ref } from "vue";

const token = localStorage.getItem('token');
let data = ref("");

const getActor = () => {
  const apiUrl = 'https://127.0.0.1:8000/api/actors?page=1';

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
getActor()
</script>

<template>
  <div class="cards-container">
    <card-actor
        v-for="actor in data"
        :key="actor.id"
        :actor="actor"
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
