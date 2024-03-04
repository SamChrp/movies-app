<script setup>
import CardActor from "@/components/CardActor.vue";
import axios from "axios";
import {computed, ref} from "vue";

const token = localStorage.getItem('token');
let data = ref("");
let showAddActorModal = ref(false);
const movies = ref([]);
const selectedMoviesId = ref([]);
const firstName = ref("");
const lastName = ref("");
const actors = ref([]);

function openAddActorModal() {
  showAddActorModal.value = true;
}
function closeAddActorModal() {
  showAddActorModal.value = false;
}

const getActors = () => {
  const apiUrl = 'http://193.168.146.5/demo-sf/api/actors?page=1';

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
}
getActors()

const addActor = async () => {
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    movies: selectedMoviesId.value.map(movieId => `/api/movie/${movieId}`)
  };

  try {
    if (!token) {
      router.push('/front/login');
      return;
    }
    const headers = {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token}`,
    };

    await axios.post(`http://193.168.146.5/demo-sf/api/actors`, data, { headers });

    showAddActorModal.value = false;
    getActors();

  } catch (error) {
    console.error('Erreur lors de la mise à jour du titre du film :', error);
  }
};

const getMovies = async () => {
  try {
    if (!token) {
      router.push('/front');
      return;
    }

    const response = await axios.get('http://193.168.146.5/demo-sf/api/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    movies.value = response.data;
  } catch (error) {
    console.error('Error', error);
    if (error.response.data.code == 401) {
      localStorage.removeItem('token');
      router.push('/front/');
      return;
    }
  }
}; getMovies()

const searchQuery = ref('');

const filteredActors = computed(() => {
  return actors.value.filter(actor => {
    const fullName = (actor.firstName + ' ' + actor.lastName).toLowerCase();
    const firstName = actor.firstName.toLowerCase();
    const lastName = actor.lastName.toLowerCase();
    const query = searchQuery.value.toLowerCase();
    return fullName.includes(query) || firstName.includes(query) || lastName.includes(query);
  });
});
</script>

<template>
  <h1>Acteurs</h1>
  <input type="text" v-model="searchQuery" placeholder="Rechercher un acteur...">
  <a class="btn btn-primary mx-4" @click="openAddActorModal">Ajouter un Acteur</a>
  <div class="cards-container">
    <card-actor
        v-for="actor in filteredActors"
        :key="actor.id"
        :actor="actor"
        :getActors="getActors"
    />
  </div>

  <div class="modal-overlay" v-if="showAddActorModal">
    <div class="modal-content">
      <div class="container-fluid">
        <button class="close-button" @click="closeAddActorModal">&#10006;</button>
        <form @submit.prevent="addActor">
          <div class="row" style="width: max-content">
            <div class="col-6">
              <div class="form-group">
                <label for="addActorFirst">Prénom :</label>
                <input type="text" class="form-control" id="addActorFirst" v-model="firstName"/>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="addActorLast">Nom :</label>
                <input type="text" class="form-control" id="addActorLast" v-model="lastName"/>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group form-group-actors">
                <label class="libelle">Films</label>
                <div v-for="movie in movies" :key="movie.id" class="actor">
                  <input type="checkbox" :id="'movie_' + movie.id" :value="movie.id" v-model="selectedMoviesId">
                  <label :for="'movie_' + movie.id">{{ movie.title }}</label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
      </div>
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

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
