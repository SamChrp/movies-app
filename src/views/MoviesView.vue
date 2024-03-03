<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CardMovie from '@/components/CardMovie.vue';


const movies = ref([]);
const categories = ref([]);
const actors = ref([]);
const router = useRouter();
const token = localStorage.getItem('token');
const selectedCatId = ref(null);
const selectedActorsId = ref([]);
const movieDuration = ref("");
const movieDescription = ref("");
const releaseDate = ref("");

const getMovies = async () => {
  try {
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

const title = ref('');

const addMovie = async () => {
  const data = {
    title: title.value,
    category: `/api/categories/${selectedCatId.value.id}`,
    duration: movieDuration.value,
    description: movieDescription.value,
    actor: selectedActorsId.value.map(actorId => `/api/actor/${actorId}`),
    releaseDate: releaseDate.value,
  };

  try {
    if (!token) {
      router.push('/login');
      return;
    }
    const headers = {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token}`,
    };

    console.log(data);
    await axios.post(`https://127.0.0.1:8000/api/movies`, data, { headers });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du titre du film :', error);
  }

};

const getCats = () => {
  const apiUrl = 'https://127.0.0.1:8000/api/categories?page=1';

  axios.get(apiUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
      .then(response => {
        categories.value = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la requête API :', error);
      });

}; getCats();

const getActors = () => {
  const apiUrl = 'https://127.0.0.1:8000/api/actors?page=1';

  axios.get(apiUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
      .then(response => {
        actors.value = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la requête API :', error);
      });
}; getActors();
</script>

<template>
  <div class="col-12 col-md-2">
  </div>
  <div>
    <h1>Films</h1>
    <a class="btn btn-primary mx-4">Ajouter un film</a>
      <div class="cards-container">
        <CardMovie v-for="movie in movies" :key="movie.id" :movie="movie" :getMovies="getMovies" />
      </div>
  </div>

  <form @submit.prevent="addMovie">
    <div class="form-group">
      <label for="addMovieTitle">Titre du film :</label>
      <input type="text" class="form-control" id="addMovieTitle" v-model="title"/>
    </div>
    <div class="form-group">
      <label for="categories">Catégorie</label>
      <select id="categories" v-model="selectedCatId">
        <option v-for="categorie in categories" :key="categorie.id" :value="categorie">{{
            categorie.name }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="categories">Durée (en minutes)</label>
      <input type="text" class="form-control" id="movieDuration" v-model="movieDuration"/>
    </div>
    <div class="form-group">
      <label for="categories">Description</label>
      <textarea class="form-control" id="movieDescription" v-model="movieDescription"></textarea>
    </div>
    <div class="form-group">
      <label class="libelle">Acteurs</label>
      <div v-for="actor in actors" :key="actor.id" class="actor">
        <input type="checkbox" :id="'actor_' + actor.id" :value="actor.id" v-model="selectedActorsId">
        <label :for="'actor_' + actor.id">{{ actor.firstName + " " + actor.lastName }}</label>
      </div>
    </div>
    <div class="form-group">
      <label for="releaseDate">Date de sortie :</label>
      <input v-model="releaseDate" type="date" :input-props="{ placeholder: 'Sélectionnez une date et une heure' }" />
    </div>

    <button type="submit" class="btn btn-primary">Ajouter</button>
  </form>

</template>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>