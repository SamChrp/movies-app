<script setup>
  import axios from "axios";
  import {ref} from "vue";
  import {useRouter} from "vue-router";

  const {movie, getMovies} = defineProps({
    movie: Object,
    getMovies: Function,
  });

  const movies = ref([]);
  const selectedMovieId = ref(null);
  const selectedMovie = ref(null);
  const editedMovieTitle = ref('');
  const router = useRouter();

  const toggleDetails = (movieId) => {
    selectedMovieId.value = selectedMovieId === movieId ? null : movieId;
    selectedMovie.value = movie.id;
    editedMovieTitle.value = selectedMovie ? selectedMovie.title : '';
  };

  const updateMovieTitle = async () => {
    if (selectedMovie.value && editedMovieTitle.value) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/merge-patch+json",
        };

        const updatedMovie = { title: editedMovieTitle.value };
        await axios.patch(`https://127.0.0.1:8000/api/movies/${selectedMovie.value}`, updatedMovie, { headers });

        getMovies();

        editedMovieTitle.value = '';
        selectedMovieId.value = null;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du titre du film :', error);
      }
    }
  };
</script>

<template>
  <div class="card-box">
    <h1>{{movie.title}}</h1>
    <p>Date de sorite : {{movie.releaseDate}}</p>
    <p>Synopsis : {{movie.description}}</p>
    <p>Durée du film : {{movie.duration}} minutes</p>
    <p>Acteurs :
      <span v-for="actor in movie.actor">{{actor.firstName}} {{actor.lastName}}, </span>
    </p>
    <p>Catégorie : {{movie.category.name}}</p>
    <div class="row mt-5">
      <div class="d-flex justify-content-center">
        <RouterLink :to="{name:'movie', params: {id:movie.id}}" class="nav-link"><button class="btn btn-primary mx-4">Détails</button></RouterLink>
        <a class="btn btn-success mx-4" @click="toggleDetails(movie.id)">Modifier</a>
      </div>
    </div>
  </div>

  <div :class="['col-md-3', { 'd-none': !selectedMovieId }]">
    <h2 v-if="selectedMovie">{{ selectedMovie.title }}</h2>
    <form @submit.prevent="updateMovieTitle">
      <div class="form-group">
        <label for="editMovieTitle">Titre du film :</label>
        <input
            type="text"
            class="form-control"
            id="editMovieTitle"
            v-if="selectedMovie"
            v-model="editedMovieTitle"
        />
      </div>
      <button type="submit" class="btn btn-primary">Modifier</button>
    </form>
  </div>
</template>

<style scoped>
  .card-box {
    padding: 1rem;
    width: 25%;
    background-color: whitesmoke;
    margin: 1rem;
  }
</style>