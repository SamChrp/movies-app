<script setup>
const {actor} = defineProps({
  actor: Object
});
</script>

<template>
  <div class="card-box">
    <h1>{{actor.firstName}} {{actor.lastName}}</h1>
    <p>Nationalité : {{actor.nationalite.intitule}}</p>
<!--    <p>Films : <span v-for="film in actor.movies"></span> {{film.title}}</p>-->
    <p>Films : <span v-for="film in actor.movies">{{film.title}}, </span></p>
<!--    <p>Durée du film : {{film.duration}} minutes</p>-->
<!--    <p>Acteurs :-->
<!--      <span v-for="actor in film.actor">{{actor.firstName}} {{actor.lastName}}, </span>-->
<!--    </p>-->
<!--    <p>Catégorie : {{film.category.name}}</p>-->
  </div>
</template>

<style scoped>
.card-box {
  padding: 1rem;
  width: 25%;
  height: 20rem;
  background-color: whitesmoke;
  margin: 1rem;
}
</style>