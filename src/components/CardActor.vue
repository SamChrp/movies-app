<script setup>
const {actor} = defineProps({
  actor: Object
});
</script>

<template>
  <div class="card-box">
    <h1>{{actor.firstName}} {{actor.lastName}}</h1>
    <p>Nationalité : {{actor.nationalite.intitule}}</p>
    <p>Films : <span v-for="film in actor.movies">{{film.title}}, </span></p>
    <div class="row mt-5">
      <div class="d-flex justify-content-center">
        <RouterLink :to="{name:'actor', params: {id:actor.id}}" class="nav-link"><button class="btn btn-primary">Détails</button></RouterLink>
      </div>
    </div>
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