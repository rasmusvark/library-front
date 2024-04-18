<template>
  <div class="catalog-container">
    <h2>Saadaolevad raamatud</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Pealkiri</th>
            <th>Autor</th>
            <th>Ilmumisaasta</th>
            <th>Kategooria</th>
            <th>Tegevus</th> <!-- Action for borrowing -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in availableBooks" :key="book.id">
            <td>{{ book.name }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publishingYear }}</td>
            <td>{{ book.category }}</td>
            <td>
              <button @click="borrowBook(book.id)" :disabled="isBorrowing">
                Laenuta
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
  name: 'BorrowView',
  data() {
    return {
      books: [],
      isBorrowing: false
    };
  },
  computed: {
    availableBooks() {
      return this.books.filter(book => book.available);
    }
  },
  created() {
    this.fetchAvailableBooks();
  },
  methods: {
    fetchAvailableBooks() {
      axios.get('http://localhost:8080/books/available')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error('Error fetching available books:', error);
        });
    },
    borrowBook(id) {
      this.isBorrowing = true;
      axios.patch(`http://localhost:8080/books/${id}/borrow`)
        .then(() => {
          alert('Raamat väljastatud!');
          this.fetchAvailableBooks();
        })
        .catch(error => {
          console.error('Error borrowing book:', error);
        })
        .finally(() => {
          this.isBorrowing = false;
        });
    }
  }
}
</script>

<style scoped>
  @import '@/assets/css/commonStyles.css';
</style>