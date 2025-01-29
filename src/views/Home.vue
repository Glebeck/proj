<template>
  <div class="home">
     <h1>НОВИНКИ ЛИТЕРАТУРЫ</h1>
     <BookList :books="books" @buy="buyBook" @bookmark="toggleBookmark"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BookList from '../components/BookList.vue';

const books = ref([]);
const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/books');
      books.value = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке книг:', error);
    }
};
const buyBook = (book) => {
    console.log('Купить книгу', book)
}
const toggleBookmark = async (bookId) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/books/${bookId}/bookmark`);
      const updateBook = response.data
      books.value = books.value.map((book) =>
          book.id === updateBook.id ? { ...book, isBookmarked: updateBook.isBookmarked } : book
      );
    } catch (error) {
      console.error('Ошибка при изменении закладки', error);
    }
  };
onMounted(getBooks);
</script>

<style scoped>
.home {
    padding: 20px;
}
</style>

