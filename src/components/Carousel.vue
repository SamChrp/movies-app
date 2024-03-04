<template>
  <div class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div v-for="(item, index) in items" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }">
        <!-- Affichage de l'élément du carousel -->
        <div class="carousel-caption">
          <h5>{{ item.title }}</h5>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.carousel-inner {
  background-color: #f5f5f5;
}
</style>
