<template>
  <main>
    <div class="bienvenue">
      <h1>Nous contacter !</h1>
    </div>
    <br><br>
    <div class="contact">
      <div class="info">
        <i class="fas fa-envelope"></i>
        <a href="mailto:acousin18@myges.fr">acousin18@myges.fr</a>
      </div>
      <div class="info">
        <i class="fas fa-map-marker-alt"></i>
        <p>EFFICOM Lille - 159-161, Bd de la Liberté, 59800 Lille</p>
      </div>
      <div class="info">
        <i class="fas fa-phone"></i>
        <p>01 02 03 04 05</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.bienvenue {
  text-align: center;
  padding: 50px;
  margin-top: 30px;
}

.contact {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
}

.info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.info i {
  margin-right: 10px;
}

a{
  color: black;
}
</style>
