import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviesView from "@/views/MoviesView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import ActorsView from "@/views/ActorsView.vue";
import LoginView from "@/views/LoginView.vue";
import ActorsDetailsView from "@/views/ActorsDetailsView.vue";
import MovieDetailsView from "@/views/MovieDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/movie/:id',
      name: 'movie',
      meta: { requiresAuth: true },
      component: MovieDetailsView
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorsView
    },
    {
      path: '/actor/:id',
      name: 'actor',
      meta: { requiresAuth: true },
      component: ActorsDetailsView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
  ]
})

export default router
