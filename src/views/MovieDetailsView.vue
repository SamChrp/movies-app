<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";

const token = localStorage.getItem('token');
let film = ref("");

let id = useRoute().params.id;

const getMovie = () => {
  const apiUrl = 'https://127.0.0.1:8000/api/movie/'+id;

  axios.get(apiUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
      .then(response => {
        film.value = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la requête API :', error);
      });
}
getMovie()
</script>

<template>
  <div class="row">
    <div>
      <router-link to='/movies' class="nav-link"><button class="btn btn-primary"><i class="bi-arrow-left"></i>Retour</button></router-link>
    </div>
  </div>
  <h1>{{film.title}}</h1>
  <p>Date de sorite : {{film.releaseDate}}</p>
  <p>Synopsis : {{film.description}}</p>
  <p>Durée du film : {{film.duration}} minutes</p>
  <p>Acteurs :
    <span v-for="actor in film.actor">{{actor.firstName}} {{actor.lastName}}, </span>
  </p>
  <p v-if="film.category">Catégorie : {{film.category.name}}</p>
</template>

<style scoped>

</style>