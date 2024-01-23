<script setup>
import {defineProps} from "vue";

const {film} = defineProps({
  film: Object
});

</script>

<template>
  <div class="card-box">
    <h1>{{film.title}}</h1>
    <p>{{film.releaseDate}}</p>
    <p>{{film.description}}</p>
    <p>{{film.duration}}</p>
  </div>
</template>

<style scoped>
.card-box {
  width: 25%;
  height: 20rem;
  background-color: whitesmoke;
  margin: 1rem;
}
</style>