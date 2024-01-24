<script setup>
const {category} = defineProps({
  category: Object
});
</script>

<template>
  <div class="card-box">
    <h1>{{category.name}}</h1>
    <p>films : <span v-for="movie in category.movies">{{movie.title}}, </span></p>
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