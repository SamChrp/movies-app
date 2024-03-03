<script setup>
function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

</script>

<template>
  <div class="nav-bar-container">
    <div class="nav-bar-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/movies" class="nav-link">Movies</router-link>
      <router-link to="/actors" class="nav-link">Actors</router-link>
      <router-link to="/categories" class="nav-link">Categories</router-link>
      <button class="btn btn-primary" @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
  .nav-bar-container {
    margin: 0;
    width: 100%;
    height: 5rem;
    border-bottom: black solid 0.3px;
  }

  .nav-bar-links {
    padding-top: 2rem;
    display: flex;
    justify-content: space-around;
  }

  .nav-link {
    text-decoration: none;
    color: black;
  }

</style>