<!--<script>-->
<!--import CardMovie from "@/components/CardMovie.vue";-->
<!--import axios from "axios";-->
<!--import { ref } from "vue";-->

<!--const token = localStorage.getItem('token');-->
<!--let data = ref("");-->

<!--const getMovies = () => {-->
<!--  const apiUrl = 'https://127.0.0.1:8000/api/movies?page=1';-->

<!--  axios.get(apiUrl, {-->
<!--    headers: {-->
<!--      Accept: 'application/json',-->
<!--      Authorization: `Bearer ${token}`,-->
<!--    },-->
<!--  })-->
<!--      .then(response => {-->
<!--        data.value = response.data;-->
<!--      })-->
<!--      .catch(error => {-->
<!--        console.error('Erreur lors de la requête API :', error);-->
<!--      });-->

<!--}-->
<!--getMovies()-->


<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      films: [],-->
<!--      selectedFilmId: null,-->
<!--      selectedFilm: null,-->
<!--      editedFilmTitle:''-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.getMovies();-->
<!--  },-->
<!--  methods: {-->
<!--    toggleDetails(filmId) {-->
<!--      // Permuter l'état du film sélectionné-->
<!--      this.selectedFilmId = this.selectedFilmId === FilmId ? null : filmId;-->
<!--      this.selectedFilm = this.films.find(film => film.id === this.selectedFilmId);-->
<!--      this.editedFilmTitle = this.selectedFilm ? this.selectedFilm.title : '';-->
<!--    },-->
<!--    async getMovies() {-->
<!--      try {-->
<!--        const token = localStorage.getItem('token');-->
<!--        if (!token) {-->
<!--          //-&#45;&#45; rediriger l'utilisateur vers la page de connexion-->
<!--          this.$router.push('/');-->
<!--          return;-->
<!--        }-->
<!--        const response = await axios.get('https://127.0.0.1:8000/api/movies', {-->
<!--          headers: {-->
<!--            Authorization: `Bearer ${token}`,-->
<!--            Accept: 'application/json',-->
<!--          },-->
<!--        });-->
<!--        this.movies = response.data;-->
<!--      } catch (error) {-->
<!--        console.error('Error', error);-->
<!--        console.log(error.response.data.code);-->
<!--        if(error.response.data.code==401){-->
<!--          //&#45;&#45;&#45;&#45; détruire le token-->
<!--          localStorage.removeItem('token');-->
<!--          //-&#45;&#45; rediriger l'utilisateur vers la page de connexion-->
<!--          this.$router.push('/');-->
<!--          return;-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    async updateFilmTitle() {-->
<!--      if (this.selectedFilm && this.editedFilmTitle) {-->
<!--        try {-->
<!--          const token = localStorage.getItem('token'); // Récupérer le token d'authentification-->
<!--          if (!token) {-->
<!--            //-&#45;&#45; rediriger l'utilisateur vers la page de connexion-->
<!--            this.$router.push('/');-->
<!--            return;-->
<!--          }-->
<!--          const headers = {-->
<!--            Authorization: `Bearer ${token}`,-->
<!--            'Content-Type': 'application/merge-patch+json',-->
<!--          };-->
<!--          const updatedFilm = { title: this.editedFilmTitle }; // Nouveau titre du film-->

<!--          // Envoyer la requête PATCH à l'API pour mettre à jour le titre du film-->
<!--          await axios.patch(`https://127.0.0.1:8000/api/movies/${this.selectedFilm.id}`, updatedFilm, { headers });-->

<!--          // Réinitialiser editedMovieTitle après la mise à jour-->
<!--          this.editedFilmTitle = '';-->

<!--          // Rafraîchir la liste des films-->
<!--          this.getMovies();-->

<!--          // Réinitialiser la sélection du film après modification-->
<!--          this.selectedMovieId = null;-->
<!--        } catch (error) {-->
<!--          console.error('Erreur lors de la mise à jour du titre du film :', error);-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <div class="cards-container">-->
<!--    <card-movie-->
<!--        v-for="film in data"-->
<!--        :key="film.id"-->
<!--        :film="film"-->
<!--    />-->
<!--&lt;!&ndash;    <a @click="toggleDetails(film.id)">Edit</a>&ndash;&gt;-->
<!--  </div>-->

<!--  <div :class="['col-md-3', { 'd-none': !selectedFilmId }]">-->
<!--    <h2 v-if="selectedFilm">{{ selectedFilm.title }}</h2>-->
<!--    <form @submit.prevent="updateFilmTitle">-->
<!--      <div class="form-group">-->
<!--        <label for="editFilmitle">Titre du film :</label>-->
<!--        <input-->
<!--            type="text"-->
<!--            class="form-control"-->
<!--            id="editFilmTitle"-->
<!--            v-if="selectedFilm"-->
<!--            v-model="editedFilmTitle"-->
<!--        />-->
<!--      </div>-->
<!--      <button type="submit" class="btn btn-primary">Modifier</button>-->
<!--    </form>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.cards-container {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  justify-content: space-around;-->
<!--}-->
<!--</style>-->
<template>
  <div>
    <h1>Liste des films</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6 border" v-for="movie in movies" :key="movie.id" >
              {{ movie.title }}
              <a @click="toggleDetails(movie.id)">Edit</a>
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

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      selectedMovieId: null,
      selectedMovie: null,
      editedMovieTitle:''
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    toggleDetails(movieId) {
      // Permuter l'état du film sélectionné
      this.selectedMovieId = this.selectedMovieId === movieId ? null : movieId;
      this.selectedMovie = this.movies.find(movie => movie.id === this.selectedMovieId);
      this.editedMovieTitle = this.selectedMovie ? this.selectedMovie.title : '';
    },
    async getMovies() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          //--- rediriger l'utilisateur vers la page de connexion
          this.$router.push('/');
          return;
        }
        const response = await axios.get('https://127.0.0.1:8000/api/movies', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        this.movies = response.data;
      } catch (error) {
        console.error('Error', error);
        console.log(error.response.data.code);
        if(error.response.data.code==401){
          //---- détruire le token
          localStorage.removeItem('token');
          //--- rediriger l'utilisateur vers la page de connexion
          this.$router.push('/');
          return;
        }
      }
    },
    async updateMovieTitle() {
      if (this.selectedMovie && this.editedMovieTitle) {
        try {
          const token = localStorage.getItem('token'); // Récupérer le token d'authentification
          if (!token) {
            //--- rediriger l'utilisateur vers la page de connexion
            this.$router.push('/');
            return;
          }
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/merge-patch+json',
          };
          const updatedMovie = { title: this.editedMovieTitle }; // Nouveau titre du film

          // Envoyer la requête PATCH à l'API pour mettre à jour le titre du film
          await axios.patch(`https://127.0.0.1:8000/api/movies/${this.selectedMovie.id}`, updatedMovie, { headers });

          // Réinitialiser editedMovieTitle après la mise à jour
          this.editedMovieTitle = '';

          // Rafraîchir la liste des films
          this.getMovies();

          // Réinitialiser la sélection du film après modification
          this.selectedMovieId = null;
        } catch (error) {
          console.error('Erreur lors de la mise à jour du titre du film :', error);
        }
      }
    },
  },
};
</script>