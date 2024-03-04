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

  function closeModal() {
    selectedMovieId.value = null;
  }

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
        await axios.patch(`http://193.168.146.5/demo-sf/api/movies/${selectedMovie.value}`, updatedMovie, { headers });

        getMovies();

        editedMovieTitle.value = '';
        selectedMovieId.value = null;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du titre du film :', error);
      }
    }
  };

  const deleteMovie = async (movieId) => {
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

      await axios.delete(`http://193.168.146.5/demo-sf/api/movies/${movieId}`, { headers });

      getMovies();

    } catch (error) {
      console.error('Erreur lors de la mise à jour du titre du film :', error);
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
        <a class="btn btn-danger mx-4" @click="deleteMovie(movie.id)">Supprimer</a>
      </div>
    </div>
  </div>

  <div class="modal-overlay" v-if="selectedMovieId">
    <div class="modal-content col-md-3">
      <button class="close-button" @click="closeModal">&#10006;</button>
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
  </div>
</template>

<style scoped>
  .card-box {
    padding: 1rem;
    width: 25%;
    background-color: whitesmoke;
    margin: 1rem;
  }


  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black overlay */
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }

  .modal-content form {
    max-width: 400px; /* adjust this as needed */
  }

  .modal-content label {
    font-weight: bold;
  }

  .modal-content input[type="text"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }

  .modal-content button {
    padding: 10px 20px;
    background-color: #007bff; /* blue color, adjust as needed */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .modal-content button:hover {
    background-color: #0056b3; /* darker blue color, adjust as needed */
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    color: #999;
  }

  .close-button:hover {
    color: #555;
  }
</style>