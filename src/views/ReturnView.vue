<template>
  <div class="catalog-container">
    <h2>Laenutuses olevad raamatud</h2>
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
            <th>Tegevus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in filteredBorrowedBooks" :key="book.id">
            <td>{{ book.title }}</td>
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
    <success-modal 
    :modal-message="'Raamat tagastatud!'" 
    v-model:isModalVisible="showModal" 
    @close="showModal = false"
  ></success-modal>
  </div>
</template>

<script>
import axios from 'axios';
import SuccessModal from '@/components/SuccessModal.vue';

export default {
  name: 'ReturnView',
  components: {
    SuccessModal
  },
  data() {
    return {
      books: [],
      searchQuery: '',
      isReturning: false,
      showModal: false
    };
    
  },
  computed: {
    filteredBorrowedBooks() {
      return this.searchQuery 
        ? this.borrowedBooks.filter((book) =>
            book.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        : this.borrowedBooks;
    },
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
          this.showModal = true;
          this.fetchBorrowedBooks();
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
