<template>
  <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <img alt="Vue logo" class="logo" src="@/assets/logo.jpg" width="125" height="125" />
    <div class="wrapper">
      <nav class="nav-links">
        <div class="center-links">
          <RouterLink to="/" class="nav-link">Accueil</RouterLink>
          <RouterLink to="/bonplan" class="nav-link">Bon Plan</RouterLink>
          <RouterLink to="/a-propos" class="nav-link">A propos</RouterLink>
        </div>
        <RouterLink to="/connexion" class="connexion"><i class="fas fa-user"></i></RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
  <footer><p>Le Bon Plan - Copyright 2023</p></footer>
</template>

<style scoped>

.nav-link {
  color: black;
  text-decoration: none;
  margin-right: 20px; 
  
}

.connexion {
  cursor: pointer;
  font-size: 20px;
  border: none;
}

i.fas.fa-user {
  color: black;
}

footer {
  color: black;
  padding: 20px 0;
  text-align: center;
  width: 100%;
}

footer p {
  margin: 0;
  font-size: 16px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  align-items: center;
}

.center-links {
  display: flex;
  align-items: center;
  margin-right: auto;
}
</style>
