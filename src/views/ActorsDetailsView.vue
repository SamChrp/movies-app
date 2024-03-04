<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";

const token = localStorage.getItem('token');
let actor = ref("");

let id = useRoute().params.id;

const getActor = () => {
  const apiUrl = 'http://193.168.146.5/demo-sf/api/actors/'+id;

  axios.get(apiUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
      .then(response => {
        actor.value = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la requête API :', error);
      });
}
getActor()
</script>

<template>
  <div class="row">
    <div>
      <router-link to='/actors' class="nav-link"><button class="btn btn-primary"><i class="bi-arrow-left"></i>Retour</button></router-link>
    </div>
  </div>
  <h1>{{actor.firstName}} {{actor.lastName}} {{actor.id}}</h1>
  <p v-if="actor.nationalite">Nationalité : {{actor.nationalite.intitule}}</p>
  <p>Films : <span v-for="film in actor.movies">{{film.title}}, </span></p>
</template>

<style scoped>

</style>