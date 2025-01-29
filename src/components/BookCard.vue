<template>
  <div class="book-card">
      <img :src="book.image" :alt="book.title" class="book-cover">
       <div class="book-details">
          <h3 class="book-title">{{book.title }}</h3>
          <p class="book-price">{{ book.price }} Руб</p>
          <div class="buttons">
          <button class="buy-button" @click="buyBook(book)">Купить</button>
          <button
           class="bookmark-button"
           @click="toggleBookmark(book.id)"
            >
          <img src="@/assets/Zakladka.png" alt="bookmark" class="bookmark-icon"/>
            </button>
           </div>
       </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
book: {
    type: Object,
    required: true
}
});

const emit = defineEmits(['buy', 'bookmark']);

const buyBook = (book) => {
emit('buy', book);
};

const toggleBookmark = (bookId) => {
emit('bookmark', bookId);
};
</script>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 200px;
  overflow: hidden;
}
.book-cover {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}
.book-details {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.buttons {
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 10px;
}
.buy-button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  margin: 0;
}
.buy-button:hover {
  background-color: #333;
}
.bookmark-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.bookmark-icon {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.bookmark-icon:hover {
  opacity: 1;
}
.book-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 10px 0;
}
.book-title {
font-size: 1.1rem;
margin: 0;
 min-height: 50px;
}
</style>
