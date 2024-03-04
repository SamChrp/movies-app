<template>
  <div class="home">
    <h1>Page d'accueil</h1>
    <div class="movie-carousel" v-if="randomMovies.length > 0">
      <h2>Films du moment :</h2>
      <div class="carousel">
        <div class="carousel-inner">
          <div v-for="(movie, index) in randomMovies" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
            <div class="carousel-content">
              <h3>{{ movie.title }}</h3>
              <p>{{ movie.description }}</p>
              <p>Date de sortie : {{ movie.releaseDate }}</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" @click="prevSlide">&#10094;</a>
        <a class="carousel-control-next" @click="nextSlide">&#10095;</a>
      </div>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>

    <div class="actor-grid" v-if="randomActors.length > 0">
      <h2>Acteurs du moment :</h2>
      <div class="actor-card" v-for="(actor, index) in randomActors" :key="index">
        <div class="actor-details">
          <h3>{{ actor.firstName }} {{ actor.lastName }}</h3>
          <p v-if="actor.movies" v-for="movie in actor.movies">{{ movie.title }},</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const movies = ref([]);
const token = localStorage.getItem('token');
const randomMovies = ref([]);
const randomActors = ref([]);
const actors = ref([]);

const getMovies = async () => {
  try {
    const response = await axios.get('http://193.168.146.5/demo-sf/api/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    movies.value = response.data;
    randomMovies.value = movies.value.sort(() => 0.5 - Math.random()).slice(0, 4);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const getActors = async () => {
  try {
    const response = await axios.get('http://193.168.146.5/demo-sf/api/actors', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    actors.value = response.data;
    randomActors.value = actors.value.sort(() => 0.5 - Math.random()).slice(0, 4);
  } catch (error) {
    console.error('Error fetching actors:', error);
  }
};

onMounted(() => {
  getMovies();
  getActors();
});

const prevSlide = () => {
  const carousel = document.querySelector('.carousel');
  carousel.scrollLeft -= carousel.offsetWidth;
};

const nextSlide = () => {
  const carousel = document.querySelector('.carousel');
  carousel.scrollLeft += carousel.offsetWidth;
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.movie-carousel {
  margin-top: 20px;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.carousel-inner {
  display: flex;
  gap: 20px;
}

.carousel-item {
  flex: 0 0 auto;
  scroll-snap-align: start;
  min-width: 300px; /* Ajustez la largeur minimale selon vos besoins */
  background-color: #f0f0f0; /* Ajoutez une couleur de fond pour tester la visibilité */
  padding: 20px;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  z-index: 1;
}

.carousel-control-prev {
  left: 0;
}

.carousel-control-next {
  right: 0;
}

.actor-grid {
  margin-top: 20px;
}

.actor-card {
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding: 10px;
}

.actor-details {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  text-align: center;
}
</style>
