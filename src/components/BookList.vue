<script setup>
import { ref, onMounted } from 'vue';
import BookCard from './BookCard.vue';
import axios from 'axios';

const books = ref([]);
const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/books');
        books.value = response.data;
    } catch (error) {
        console.error('Ошибка загрузки книг:', error);
    }
};
onMounted(() => {
    fetchBooks();
});
const handleBookmark = async (bookId) => {
    try {
        const response = await axios.patch(
            `http://localhost:5001/api/books/${bookId}/bookmark`
        );
        const updatedBook = response.data;
        books.value = books.value.map((book) => (book.id === bookId ? updatedBook : book));
    } catch (error) {
        console.error('Ошибка обновления закладки', error);
    }
};
</script>
<template>
    <div class="book-list">
        <h2>НОВИНКИ ЛИТЕРАТУРЫ</h2>
        <div class="books-grid">
            <BookCard v-for="book in books" :key="book.id" :book="book" @bookmark="handleBookmark" />
        </div>
    </div>
</template>
<style scoped>
.book-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: black;
}
.books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}
h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
}
</style>
