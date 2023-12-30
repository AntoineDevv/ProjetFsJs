<template>
  <main>
    <section class="admin-buttons">
      <button @click="toggleAjouterBonPlan">Ajouter un bon plan</button>
      <button @click="toggleModifierBonPlan">Modifier un bon plan</button>
      <button @click="toggleShowDeleteInput">Supprimer un bon plan</button>
    </section>

    <header class="header">
      <h1>Notre Catalogue</h1>
    </header>

    <section class="catalogue">
      <div v-for="(item, index) in catalogue" :key="index" class="item">
        <img :src="item.image" :alt="'Produit ' + (index + 1)">
        <h2>{{ item.nom }}</h2>
        <p>Prix: <a :href="item.lien">{{ item.prix }}</a></p>
      </div>
    </section>

    <div v-show="showInput" class="delete-input">
      <input type="text" v-model="idBonPlanASupprimer" placeholder="Entrez l'ID du bon plan à supprimer">
      <button @click="supprimerBonPlanById" class="delete-button">Valider</button>
    </div>

    <div v-show="showAddPlanForm" class="add-plan-inputs">
      <input type="text" v-model="nouveauProduit.nom" placeholder="Nom du produit">
      <input type="text" v-model="nouveauProduit.prix" placeholder="Prix du produit">
      <input type="text" v-model="nouveauProduit.image" placeholder="Chemin de l'image">
      <input type="text" v-model="nouveauProduit.lien" placeholder="Lien du produit">
      <button @click="validerNouveauProduit" class="add-button">Valider</button>
    </div>

    <div v-show="showEditForm" class="edit-inputs">
      <input type="text" v-model="idBonPlanAModifier" placeholder="Entrez l'ID du bon plan à modifier">
      <button @click="validerEditFields" class="edit-button">Valider</button>
    </div>
    <div v-show="showEditFields" class="edit-fields">
      <input type="text" v-model="bonPlanModifie.nom" placeholder="Nom du produit">
      <input type="text" v-model="bonPlanModifie.prix" placeholder="Prix du produit">
      <input type="text" v-model="bonPlanModifie.image" placeholder="Chemin de l'image">
      <input type="text" v-model="bonPlanModifie.lien" placeholder="Lien du produit">
      <button @click="modifierBonPlanById" class="edit-button">Terminer</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      catalogue: [
        {
          id: 1,
          nom: "Pc Portable Lenovo",
          prix: "599€",
          image: "../assets/lenovo.jpg",
          lien: "https://www.amazon.fr/Lenovo-IdeaPad-Gaming-15ARH7-dExploitation/dp/B0CGXYCXGC"
        },
        {
          id: 2,
          nom: "Apple Iphone 15",
          prix: "899€",
          image: "../assets/iphone.jpg",
          lien: "https://www.amazon.it/dp/B0CHWV5HTM?smid=A11IL2PNWYJU7H&th=1"
        },
        {
          id: 3,
          nom: "TV OLED Philips 121cm",
          prix: "1099€",
          image: "../assets/tv.webp",
          lien: "https://www.fnac.com/TV-OLED-Philips-48OLED848-121-cm-Ambilight-4K-UHD-120HZ-Smart-TV-2023-Chrome-satine/a18121788/w-4"
        },
      ],
      idBonPlanASupprimer: null,
      showInput: false,
      showAddPlanForm: false,
      showEditForm: false,
      showEditFields: false,
      idBonPlanAModifier: null,
      nouveauProduit: {
        nom: '',
        prix: '',
        image: '',
        lien: ''
      },
      bonPlanModifie: {
        id: null,
        nom: "",
        prix: "",
        image: "",
        lien: ""
      }
    };
  },
  methods: {
    ajouterBonPlan() {
      this.showAddPlanForm = true;
    },
    modifierBonPlan() {
      this.showEditForm = true;
    },
    showDeleteInput() {
      this.showInput = true;
    },
    supprimerBonPlanById() {
      if (this.idBonPlanASupprimer !== null) {
        const index = this.catalogue.findIndex(item => item.id === parseInt(this.idBonPlanASupprimer));
        if (index !== -1) {
          this.catalogue.splice(index, 1);
          this.idBonPlanASupprimer = null;
          this.showInput = false;
        }
      }
    },
    validerNouveauProduit() {
      const newId = this.catalogue.length + 1;
      this.catalogue.push({
        id: newId,
        nom: this.nouveauProduit.nom,
        prix: this.nouveauProduit.prix,
        image: this.nouveauProduit.image,
        lien: this.nouveauProduit.lien
      });
      this.nouveauProduit.nom = '';
      this.nouveauProduit.prix = '';
      this.nouveauProduit.image = '';
      this.nouveauProduit.lien = '';
      this.showAddPlanForm = false;
    },
    showEditFields() {
      const bonPlan = this.catalogue.find(item => item.id === parseInt(this.idBonPlanAModifier));
      if (bonPlan) {
        this.bonPlanModifie = { ...bonPlan };
        this.showEditFields = true;
      } else {
        alert("ID du bon plan non trouvé.");
        this.showEditForm = false;
      }
    },
    modifierBonPlanById() {
      const index = this.catalogue.findIndex(item => item.id === parseInt(this.idBonPlanAModifier));
      if (index !== -1) {
        this.catalogue.splice(index, 1, this.bonPlanModifie);
        this.idBonPlanAModifier = null;
        this.showEditFields = false;
        this.bonPlanModifie = { id: null, nom: "", prix: "", image: "", lien: "" };
      }
    },
    validerEditFields() {
      const bonPlan = this.catalogue.find(item => item.id === parseInt(this.idBonPlanAModifier));

      if (bonPlan) {
        // Mettez ici le code pour valider les champs si nécessaire
        // Par exemple, vous pouvez ajouter des conditions pour vérifier les champs avant de permettre la modification

        // Si la validation est réussie, mettez à jour les champs d'édition
        this.bonPlanModifie = { ...bonPlan };
        this.showEditFields = true;
      } else {
        alert("ID du bon plan non trouvé.");
        this.showEditForm = false;
      }
    },

    // Nouvelles méthodes pour basculer l'affichage
    toggleAjouterBonPlan() {
      this.showAddPlanForm = !this.showAddPlanForm;
      this.showInput = false;
      this.showEditForm = false;
    },
    toggleModifierBonPlan() {
      this.showEditForm = !this.showEditForm;
      this.showAddPlanForm = false;
      this.showInput = false;
    },
    toggleShowDeleteInput() {
      this.showInput = !this.showInput;
      this.showAddPlanForm = false;
      this.showEditForm = false;
    },
  },
};
</script>



<style>
main {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.admin-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.admin-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.admin-buttons button:hover {
  background-color: #45a049;
}

header {
  margin-top: 20px;
  text-align: center;
  padding: 20px 0;
}

h1 {
  margin: 0;
  font-size: 24px;
}

.catalogue {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}

.item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  background-color: #fff;
}

.item img {
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: 10px;
}

.item h2 {
  margin: 5px 0;
  font-size: 18px;
}

.item p {
  margin: 5px 0;
  font-size: 16px;
}

.delete-input,
.modify-input,
.add-plan-inputs,
.edit-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.delete-input input,
.modify-input input,
.add-plan-inputs input[type="text"],
.edit-inputs input[type="text"],
.delete-input .delete-button,
.modify-input button,
.add-plan-inputs button.add-button,
.edit-inputs button.edit-button {
  padding: 8px;
  margin: 0 auto; 
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 30%; 
  box-sizing: border-box;
}

.delete-input .delete-button:hover,
.modify-input button:hover,
.add-plan-inputs button.add-button:hover,
.edit-inputs button.edit-button:hover {
  background-color: #45a049;
}


</style>