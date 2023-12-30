<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isConnected = ref(false)

async function login() {
  const user = {
    email: email.value,
    mdp: password.value
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (response.ok) {
      isConnected.value = true; 
      console.log('Connexion réussie')
    } else {
      console.error('Échec de la connexion')
    }
  } catch (error) {
    console.error('Une erreur est survenue', error)
  }
}
</script>

<template>
  <main>
    <div class="bienvenue">
      <h1>Se connecter !</h1><br>
    </div>
    <br><br>
    <div class="formulaire">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required>
        <button @click="login">Se connecter</button><br><br>
        <router-link to="/inscription">Inscrivez-vous ici</router-link>
      </form>

      
      <div v-if="isConnected" class="connexion-message">
        <p>Vous êtes connecté(e)!</p>
      </div>
    </div>
  </main>
</template>

<style>

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.bienvenue h1 {
  font-size: 2.5rem;
  text-align: center;
}

.formulaire {
  background-color: #000; 
  color: #fff; 
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); 
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input[type="email"],
input[type="password"],
button {
  width: 93%;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 6px;
  text-align: center;
}

button {
  background-color: #fff; 
  color: #000; 
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #333;
  color: #fff;
}

a{
  color: white;
}

.connexion-message{
  color: green;
}
</style>