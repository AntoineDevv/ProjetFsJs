<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isRegistered = ref(false)
const registrationError = ref('')

async function register() {
  const user = {
    email: email.value,
    mdp: password.value,
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (response.ok) {
      isRegistered.value = true; 
      console.log('Inscription réussie')
    } else {
      registrationError.value = 'Échec de l\'inscription'
      console.error('Échec de l\'inscription')
    }
  } catch (error) {
    registrationError.value = 'Une erreur est survenue lors de l\'inscription'
    console.error('Une erreur est survenue', error)
  }
}
</script>

<template>
  <main>
    <div class="bienvenue">
      <h1>S'inscrire !</h1><br>
    </div>
    <div class="formulaire">
      <h2>Inscription</h2>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <label for="password">Mot de passe:</label>
      <input type="password" id="password" v-model="password" required>
      <button @click="register">S'inscrire</button><br><br>
      <router-link to="/connexion">Vous avez déjà un compte? Connectez-vous ici</router-link>
    </div>

    <div v-if="isRegistered" class="message">
      <p>Vous êtes maintenant inscrit(e) !</p>
    </div>

    <div v-if="registrationError" class="error">
      <p>{{ registrationError }}</p>
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

.message {
  color: green;
}

.error {
  color: red;
}
</style>