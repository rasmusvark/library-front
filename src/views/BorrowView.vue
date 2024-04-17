<template>
  <div>
    <h2>Borrow a Book</h2>
    <ul>
      <li v-for="book in availableBooks" :key="book.id">
        {{ book.name }} by {{ book.author }}
        <button @click="borrowBook(book.id)">Borrow</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BorrowView',
  data() {
    return {
      books: []
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
      axios.patch(`http://localhost:8080/books/${id}/borrow`)
        .then(() => {
          this.fetchAvailableBooks(); // Refresh list after borrowing
        })
        .catch(error => {
          console.error('Error borrowing book:', error);
        });
    }
  }
}
</script>
