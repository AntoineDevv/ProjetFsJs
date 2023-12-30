<template>
  <div class="bienvenue">
    <h1>Bienvenue sur notre site de bons plans informatiques !</h1>
    <p>Découvrez les meilleures offres sur une large gamme de produits informatiques et technologiques.</p>
    <h2>N'hésitez pas à explorer notre section <router-link to="/bonplan" class="lien">Bons Plans</router-link> pour dénicher des réductions exclusives sur du matériel informatique de qualité</h2>
    <img src="../assets/bonplan.png" class="bonplanimg">
  </div>
</template>

<script>
export default {
  name: 'WelcomeView',
}
</script>

<style scoped>
.bienvenue {
  text-align: center;
  padding: 50px;
  background-color: white;
}

h1 {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 20px;
}

.lien {
  text-decoration: underline; 
}

.bonplanimg {
  width: 600px; 
  height: auto; 
}
</style>
