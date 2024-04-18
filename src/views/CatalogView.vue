<template>
  <div class="catalog-container">
    <h2>Kataloog</h2>
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Otsi pealkirja järgi"
        class="search-input"
      />
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Pealkiri</th>
            <th>Autor</th>
            <th>Ilmumisaasta</th>
            <th>Kategooria</th>
            <th>Saadavus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in filteredBooks" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publishingYear }}</td>
            <td>{{ book.category }}</td>
            <td>{{ book.available ? 'Saadaval' : 'Ei ole saadaval' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/">
      <button>Tagasi</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CatalogView',
  data() {
    return {
      books: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredBooks() {
      if (this.searchQuery) {
        return this.books.filter((book) =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.books; // If there's no search query, return all books
    }
  },
  created() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      axios.get('http://localhost:8080/books')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    }
  }
}
</script>

<style scoped>
  @import '@/assets/css/commonStyles.css';
</style>