<template>
  <div class="catalog-container">
    <h2>Tagasta raamat</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Pealkiri</th>
            <th>Autor</th>
            <th>Ilmumisaasta</th>
            <th>Kategooria</th>
            <th>Tegevus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in borrowedBooks" :key="book.id">
            <td>{{ book.name }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publishingYear }}</td>
            <td>{{ book.category }}</td>
            <td>
              <button @click="returnBook(book.id)" :disabled="isReturning">
                Tagasta
              </button>
            </td>
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
  name: 'ReturnView',
  data() {
    return {
      books: [],
      isReturning: false
    };
  },
  computed: {
    borrowedBooks() {
      return this.books.filter(book => !book.available);
    }
  },
  created() {
    this.fetchBorrowedBooks();
  },
  methods: {
    fetchBorrowedBooks() {
      axios.get('http://localhost:8080/books/borrowed')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error('Error fetching borrowed books:', error);
        });
    },
    returnBook(id) {
      this.isReturning = true;
      axios.patch(`http://localhost:8080/books/${id}/return`)
        .then(() => {
          alert('Raamat tagastatud!');
          this.fetchBorrowedBooks(); // Refresh list after returning
        })
        .catch(error => {
          console.error('Error returning book:', error);
        })
        .finally(() => {
          this.isReturning = false;
        });
    }
  }
}
</script>

<style scoped>
  @import '@/assets/css/commonStyles.css';
</style>
