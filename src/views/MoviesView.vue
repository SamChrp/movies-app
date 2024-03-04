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
let fileInput = ref('');
let showAddMovieModal = ref(false);

function openAddMovieModal() {
   showAddMovieModal.value = true;
}
function closeAddMovieModal() {
   showAddMovieModal.value = false;
}

const getMovies = async () => {
  try {
    if (!token) {
      router.push('/');
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

    await axios.post(`http://193.168.146.5/demo-sf/api/movies`, data, { headers });

    showAddMovieModal.value = false;
    getMovies();

  } catch (error) {
    console.error('Erreur lors de la mise à jour du titre du film :', error);
  }
};

const getCats = () => {
  const apiUrl = 'http://193.168.146.5/demo-sf/api/categories?page=1';

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
}; getActors();

const uploadImage = function() {
  const fileInput = this.refs.fileInput;
  const file = fileInput.files[0];

  if (!file) {
    console.log("Veuillez sélectionner une image");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  // Appel de la fonction pour envoyer le media à l'API
  this.uploadToApi(formData);
};

const uploadToApi = async function(formData) {
  console.log(formData);

  try {
    // Récupérer le JWT depuis le local storage
    const token = localStorage.getItem("token");

    // Utilisation d'Axios pour envoyer l'image à l'API avec le JWT
    const response = await this.axios.post("http://193.168.146.5/demo-sf/api/media_objects", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Réponse de l'API :", response.data);

    //--- RECUPERATION DE L'ID du media uploadé
    //--- ENVOI DE L'ID du media vers le point d'API de création ou update actor / media / etc

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'image :", error);
  }
};

const methods = {
  uploadImage,
  uploadToApi
};
</script>

<template>
  <div>
    <h1>Films</h1>
    <a class="btn btn-primary mx-4" @click="openAddMovieModal">Ajouter un film</a>
      <div class="cards-container">
        <CardMovie v-for="movie in movies" :key="movie.id" :movie="movie" :getMovies="getMovies"/>
      </div>
  </div>

  <div class="modal-overlay" v-if="showAddMovieModal">
    <div class="modal-content">
      <div class="container-fluid">
        <button class="close-button" @click="closeAddMovieModal">&#10006;</button>
        <form @submit.prevent="addMovie">
          <div class="row" style="width: max-content">
            <div class="col-6">
              <div class="form-group">
                <label for="addMovieTitle">Titre du film :</label>
                <input type="text" class="form-control" id="addMovieTitle" v-model="title"/>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="categories">Catégorie</label>
                <select id="categories" v-model="selectedCatId">
                  <option v-for="categorie in categories" :key="categorie.id" :value="categorie">{{
                      categorie.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="categories">Durée (en minutes)</label>
                <input type="text" class="form-control" id="movieDuration" v-model="movieDuration"/>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="categories">Description</label>
                <textarea class="form-control" id="movieDescription" v-model="movieDescription"></textarea>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group form-group-actors">
                <label class="libelle">Acteurs</label>
                <div v-for="actor in actors" :key="actor.id" class="actor">
                  <input type="checkbox" :id="'actor_' + actor.id" :value="actor.id" v-model="selectedActorsId">
                  <label :for="'actor_' + actor.id">{{ actor.firstName + " " + actor.lastName }}</label>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="releaseDate">Date de sortie :</label>
                <input v-model="releaseDate" type="date" :input-props="{ placeholder: 'Sélectionnez une date et une heure' }" />
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
      </div>
    </div>
  </div>

  <form @submit.prevent="uploadImage">
    <input type="file" ref="fileInput" />
    <button type="submit">Envoyer</button>
  </form>

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