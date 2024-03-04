<script setup>
  import axios from "axios";
  import {ref} from "vue";
  import {useRouter} from "vue-router";

  const {movie, getMovies} = defineProps({
    movie: Object,
    getMovies: Function,
    actors: Array,
    categories: Array,
  });

  const movies = ref([]);
  const selectedMovieId = ref(null);
  const router = useRouter();
  const selectedActorsId = ref([]);
  const selectedCatId = ref(null);
  const title = ref('');
  const movieDuration = ref('');
  const movieDescription = ref('');
  const releaseDate = ref('');
  const selectedMovie = ref(null);

  const toggleDetails = (movieId) => {
    selectedMovieId.value = selectedMovieId === movieId ? null : movieId;
    selectedMovie.value = movie.id;
  };

  function closeModal() {
    selectedMovieId.value = null;
  }

  const updateMovie = async () => {
    const data = {
      title: title.value,
      category: `/api/categories/${selectedCatId.value.id}`,
      duration: movieDuration.value,
      description: movieDescription.value,
      actor: selectedActorsId.value.map(actorId => `/api/actor/${actorId}`),
      releaseDate: releaseDate.value,
    };
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/front/');
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      await axios.put(`http://193.168.146.5/demo-sf/api/movies/${selectedMovie.value}`, data, { headers });

      getMovies();

      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du film :', error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/front/');
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
    <div class="modal-content col-md-6">
      <button class="close-button" @click="closeModal">&#10006;</button>
      <form @submit.prevent="updateMovie">
        <div class="row" style="width: max-content">
          <div class="form-group col-6">
            <label for="editMovieTitle">Titre du film :</label>
            <input type="text" class="form-control" id="editMovieTitle" v-model="title"/>
          </div>
          <div class="form-group col-6">
            <label for="editReleaseDate">Date de sortie :</label>
            <input type="date" class="form-control" id="editReleaseDate" v-model="releaseDate"/>
          </div>
          <div class="form-group col-6">
            <label for="editDescription">Description :</label>
            <textarea class="form-control" id="editDescription" v-model="movieDescription"></textarea>
          </div>
          <div class="form-group col-6">
            <label for="editDuration">Durée (en minutes) :</label>
            <input type="text" class="form-control" id="editDuration" v-model="movieDuration"/>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="editCategories">Catégories :</label>
              <select id="categories" v-model="selectedCatId">
                <option v-for="categorie in categories" :key="categorie.id" :value="categorie">{{
                    categorie.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group form-group-actors">
              <label class="libelle">Acteurs :</label>
              <div v-for="actor in actors" :key="actor.id" class="actor">
                <input type="checkbox" :id="'actor_' + actor.id" :value="actor.id" v-model="selectedActorsId">
                <label :for="'actor_' + actor.id">{{ actor.firstName + " " + actor.lastName }}</label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Modifier</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-group-actors {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Trois colonnes égales */
  gap: .5em; /* Espacement entre les éléments */
  font-size: .8em;
}

.form-group-actors .libelle {
  grid-column: 1 / -1; /* Le libellé s'étend sur toutes les colonnes */
  font-weight: bold;
}

.actor {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.form-group-actors label {
  display: block; /* Afficher les labels sur une nouvelle ligne */
}

.form-group-actors input[type="checkbox"] {
  margin-right: 5px; /* Espacement entre la case à cocher et le label */
}

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