<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CardMovie from '@/components/CardMovie.vue';

const movies = ref([]);
const router = useRouter();

const getMovies = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    const response = await axios.get('https://127.0.0.1:8000/api/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    movies.value = response.data;
  } catch (error) {
    console.error('Error', error);
    console.log(error.response.data.code);
    if (error.response.data.code == 401) {
      localStorage.removeItem('token');
      router.push('/');
      return;
    }
  }
};

onMounted(() => {
  getMovies();
});
</script>

<template>
  <div>
    <h1>Films</h1>
      <div class="cards-container">
        <CardMovie v-for="movie in movies" :key="movie.id" :movie="movie" :getMovies="getMovies" />
      </div>
  </div>
</template>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>