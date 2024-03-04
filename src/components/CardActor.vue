<script setup>
import axios from "axios";
import {ref} from "vue";
import {useRouter} from "vue-router";

const {actor, getActors} = defineProps({
  actor: Object,
  getActors: Function,
});

const actors = ref([]);
const selectedActorId = ref(null);
const selectedActor = ref(null);
const editedActorFirstName = ref('');
const editedActorLastName = ref('');
const router = useRouter();

const toggleDetails = (actorId) => {
  selectedActorId.value = selectedActorId === actorId ? null : actorId;
  selectedActor.value = actor.id;
  editedActorFirstName.value = selectedActor ? selectedActor.firstName : '';
  editedActorLastName.value = selectedActor ? selectedActor.lastName : '';
};

const updateActor = async () => {
  if (selectedActor.value && (editedActorFirstName.value || editedActorLastName.value)) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/front/');
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/merge-patch+json",
      };

      let updatedActor = '';

      if (editedActorFirstName.value && editedActorLastName.value) {
        updatedActor = { firstName: editedActorFirstName.value, lastName: editedActorLastName.value };
      } else if (editedActorFirstName.value) {
        updatedActor = { firstName: editedActorFirstName.value };
      } else {
        updatedActor = { lastName: editedActorLastName.value };
      }

      await axios.patch(`http://193.168.146.5/demo-sf/api/actors/${selectedActor.value}`, updatedActor, { headers });

      getActors();

      editedActorFirstName.value = '';
      selectedActorId.value = null;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du titre du film :', error);
    }
  }
};

const deleteActor = async (actorId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/front/');
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/merge-patch+json",
    };

    await axios.delete(`http://193.168.146.5/demo-sf/api/actors/${actorId}`, { headers });

    getActors();

  } catch (error) {
    console.error('Erreur lors de la mise à jour du titre du film :', error);
  }
};
</script>

<template>
  <div class="card-box">
    <h1>{{actor.firstName}} {{actor.lastName}}</h1>
    <p v-if="actor.nationalite">Nationalité : {{actor.nationalite.intitule}}</p>
    <p>Films : <span v-for="film in actor.movies">{{film.title}}, </span></p>
    <div class="row mt-5">
      <div class="d-flex justify-content-center">
        <RouterLink :to="{name:'actor', params: {id:actor.id}}" class="nav-link"><button class="btn btn-primary mx-4">Détails</button></RouterLink>
        <a class="btn btn-success mx-4" @click="toggleDetails(actor.id)">Modifier</a>
        <a class="btn btn-danger mx-4" @click="deleteActor(actor.id)">Supprimer</a>
      </div>
    </div>
  </div>

  <div :class="['col-md-3', { 'd-none': !selectedActorId }]">
    <h2 v-if="selectedActor">{{ selectedActor.title }}</h2>
    <form @submit.prevent="updateActor">
      <div class="form-group">
        <label for="editActorFirstName">Prénom de l'acteur :</label>
        <input
            type="text"
            class="form-control"
            id="editActorFirstName"
            v-if="selectedActor"
            v-model="editedActorFirstName"
        />
      </div>
      <div class="form-group">
        <label for="editActorLastName">Nom de l'acteur :</label>
        <input
            type="text"
            class="form-control"
            id="editActorLastName"
            v-if="selectedActor"
            v-model="editedActorLastName"
        />
      </div>
      <button type="submit" class="btn btn-primary">Modifier</button>
    </form>
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