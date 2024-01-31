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
    <div class="row mt-5">
      <div class="d-flex justify-content-center">
        <RouterLink :to="{name:'movie', params: {id:film.id}}" class="nav-link"><button class="btn btn-primary">Détails</button></RouterLink>
      </div>
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
</style>