<template>
    <div>
      <h2>Lisa uus raamat</h2>
      <form @submit.prevent="addBook">
        <div>
          <input v-model="newBook.name" placeholder="Raamatu nimi" required oninvalid="this.setCustomValidity('Palun sisestage raamatu nimi')" oninput="this.setCustomValidity('')">
          <input v-model="newBook.author" placeholder="Autor" required oninvalid="this.setCustomValidity('Palun sisestage autor')" oninput="this.setCustomValidity('')">
          <input v-model="newBook.publishingYear" placeholder="Ilmumisaasta">
          <input v-model="newBook.category" placeholder="Kategooria">
        </div>
        <button type="submit">Lisa</button>
        <router-link to="/">
          <button>Tagasi</button>
        </router-link>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AddBookView',
    data() {
      return {
        newBook: {
          name: '',
          author: '',
          publishingYear: '',
          category: ''
        }
      };
    },
    methods: {
      addBook() {
        axios.post('http://localhost:8080/books', this.newBook)
          .then(() => {
            alert('Raamat edukalt lisatud!');
            this.newBook = { name: '', author: '', publishingYear: '', category: '' }; // Reset form
          })
          .catch(error => {
            console.error('Viga raamatu lisamisel:', error);
          });
      }
    }
  }
  </script>
  