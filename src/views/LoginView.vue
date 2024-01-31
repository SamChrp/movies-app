<script setup>
import { ref } from 'vue'
import axios from "axios";

const username = ref('')
const password = ref('')
let token = ref(localStorage.getItem('token'))

const submitForm = () => {
  axios
    .post('https://localhost:8000/api/login_check', {
    email: username.value,
    password: password.value,

    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
    localStorage.setItem('token', response.data.token);
    location.href = '/home'
  })
    .catch(error => {
      console.log(username.value)
    console.log(error)
  })

}
</script>

<template>
  <body>
  <div  class="container">
    <div  class="form-login">
      <h2>Connexion</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Nom d'utilisateur :</label>
          <input type="text" id="username" name="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" name="password" v-model="password" required>
        </div>
        <div class="form-group">
          <button type="submit">Se Connecter</button>
        </div>
      </form>
    </div>
  </div>
  </body>
</template>

<style>
.container {
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form-login {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #0056b3;
}
</style>