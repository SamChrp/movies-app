<script setup>
import cardCategory from "@/components/CardCategory.vue";
import axios from "axios";
import { ref } from "vue";

const token = localStorage.getItem('token');
let data = ref("");

const getCats = () => {
  const apiUrl = 'http://193.168.146.5/demo-sf/api/categories?page=1';

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
getCats()
</script>

<template>
  <div class="cards-container">
    <card-category
        v-for="category in data"
        :key="category.id"
        :category="category"
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