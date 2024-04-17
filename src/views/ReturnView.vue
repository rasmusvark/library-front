<template>
  <div>
    <h2>Return a Book</h2>
    <ul>
      <li v-for="book in borrowedBooks" :key="book.id">
        {{ book.name }} by {{ book.author }}
        <button @click="returnBook(book.id)">Return</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReturnView',
  data() {
    return {
      books: []
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
      axios.get('http://localhost:8080/books/borrowed') // Assuming this endpoint exists
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error('Error fetching borrowed books:', error);
        });
    },
    returnBook(id) {
      axios.patch(`http://localhost:8080/books/${id}/return`)
        .then(() => {
          this.fetchBorrowedBooks(); // Refresh list after returning
        })
        .catch(error => {
          console.error('Error returning book:', error);
        });
    }
  }
}
</script>
