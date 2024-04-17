<template>
  <div>
    <h2>Book Catalog</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} by {{ book.author }} - {{ book.available ? 'Available' : 'Borrowed' }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CatalogView',
  data() {
    return {
      books: []
    };
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
