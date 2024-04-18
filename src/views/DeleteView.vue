<template>
  <div class="catalog-container">
    <h2>Kustuta raamat</h2>
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
            <th>Tegevus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in filteredBooks" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publishingYear }}</td>
            <td>{{ book.category }}</td>
            <td>{{ book.available ? 'Saadaval' : 'Ei ole saadaval' }}</td>
            <td>
              <button @click="confirmDelete(book.id, book.title)">Kustuta</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/">
      <button>Tagasi</button>
    </router-link>

    <!-- Modal Section -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <p>Kas oled kindel, et soovid kustutada raamatu "{{ bookToDeleteTitle }}"?</p>
        <button @click="deleteBook(bookToDeleteId)">Jah</button>
        <button @click="showModal = false">Tagasi</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeleteView',
  data() {
    return {
      books: [],
      searchQuery: '',
      showModal: false,
      bookToDeleteId: null,
      bookToDeleteTitle: ""
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
    },
    confirmDelete(id, title) {
      this.bookToDeleteId = id;
      this.bookToDeleteTitle = title;
      this.showModal = true;
    },
    deleteBook(id) {
      axios.delete(`http://localhost:8080/books/${id}`)
        .then(() => {
          alert('Raamat kustutatud!');
          this.showModal = false;
          this.fetchBooks(); // Refresh the list after deletion
        })
        .catch(error => {
          console.error('Error deleting book:', error);
          this.showModal = false;
        });
    }
  }
}
</script>

<style scoped>
  @import '@/assets/css/commonStyles.css';

.modal {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  animation-name: animatetop;
  animation-duration: 0.4s
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}
</style>