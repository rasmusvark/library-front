<template>
  <div>
    <h2>Lisa uus raamat</h2>
    <form @submit.prevent="addBook">
      <div>
        <input v-model="newBook.title" placeholder="Raamatu pealkiri" required oninvalid="this.setCustomValidity('Palun sisestage raamatu nimi')" oninput="this.setCustomValidity('')">
        <input v-model="newBook.author" placeholder="Autor" required oninvalid="this.setCustomValidity('Palun sisestage autor')" oninput="this.setCustomValidity('')">
        <input v-model="newBook.publishingYear" placeholder="Ilmumisaasta">
        <input v-model="newBook.category" placeholder="Kategooria">
      </div>
      <button type="submit">Lisa</button>
      <router-link to="/">
        <button>Tagasi</button>
      </router-link>
    </form>
    <success-modal 
    :modal-message="'Raamat edukalt lisatud!'" 
    v-model:isModalVisible="showModal" 
    @close="showModal = false"
  ></success-modal>
  </div>
</template>

<script>
import axios from 'axios';
import SuccessModal from '@/components/SuccessModal.vue';

export default {
  name: 'AddBookView',
  components: {
    SuccessModal
  },
  data() {
    return {
      newBook: {
        title: '',
        author: '',
        publishingYear: '',
        category: '',
      },
      showModal: false
    };
  },
  methods: {
    addBook() {
  const payload = {
    title: this.newBook.title,
    author: this.newBook.author,
    category: this.newBook.category,
    publishingYear: this.newBook.publishingYear ? parseInt(this.newBook.publishingYear) : null,
  };

  axios.post('http://localhost:8080/books', payload)
    .then(() => {
      this.showModal = true;
      this.resetForm();
    })
    .catch(error => {
      console.error('Viga raamatu lisamisel:', error.response.data.message);
      alert(error.response.data.message || 'Viga raamatu lisamisel');
    });
},
resetForm() {
  this.newBook = { title: '', author: '', publishingYear: '', category: '' };
}
  }
}
</script>
