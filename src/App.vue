<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MoviesHomePageView from "@/components/moviesHomePageView.vue";
import CardMovie from "@/components/CardMovie.vue";
import NavBar from "@/components/navBar.vue";

</script>

<template>
  <NavBar />
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>


  <RouterView />
  <CardMovie />
</template>

<style scoped>

</style>
