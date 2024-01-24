<script setup>
  const {film} = defineProps({
    film: Object
  });
</script>

<template>
  <div class="card-box">
    <h1>{{film.title}}</h1>
    <p>Date de sorite : {{film.releaseDate}}</p>
    <p>Synopsis : {{film.description}}</p>
    <p>Durée du film : {{film.duration}} minutes</p>
    <p>Acteurs :
      <span v-for="actor in film.actor">{{actor.firstName}} {{actor.lastName}}, </span>
    </p>
    <p>Catégorie : {{film.category.name}}</p>
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