<template>
    <header :class="{ 'sticky-header': isSticky }" class="header">
      <div class="container">
        <div class="header-container">
          <div class="logo-container">
            <span class="logo">Книжный магазин</span>
            <button class="catalog-button" @click="$emit('catalog-click')">
              Каталог
            </button>
          </div>
          <div class="search-container">
            <input
              type="text"
              placeholder="Что будем искать?"
              class="search-input"
              @input="$emit('search-input', $event.target.value)"
            />
            <button class="search-button">
              <font-awesome-icon icon="magnifying-glass" />
            </button>
          </div>
          <div class="nav-container">
            <nav>
              <ul>
                <li>
                  <router-link to="/">Главная</router-link>
                </li>
                <li>
                  <router-link to="/favorite">Избранное</router-link>
                </li>
                <li>
                  <router-link to="/purchase">Корзина</router-link>
                </li>
                 <li>
                    <router-link to="/">Покупки</router-link>
                  </li>
                <li>
                  <button class="button-login" @click="openModal">
                    Войти
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { defineEmits } from "vue";
  import { onMounted, onUnmounted, ref } from "vue";
  import { useAuthStore } from "@/stores/auth";
  const emit = defineEmits([
    "catalog-click",
    "search-input",
    "nav-click",
    "login-click",
  ]);
  
  const isSticky = ref(false);
  
  const handleScroll = () => {
    isSticky.value = window.scrollY > 0;
  };
  
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
  const authStore = useAuthStore();
  const openModal = () => {
    authStore.openModal();
  }
  </script>
  
  <style scoped>
  /* Оригинальные стили без изменений */
  .button-login {
    background-color: rgb(255, 255, 255);
    padding: 10px 25px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 400;
    border: none;
    color: black;
  }
  
  /* Новые стили */
  .header {
    height: 50px;
    display: flex;
    align-items: center;
  }
  
  .header.sticky-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: rgb(255, 255, 255);
  }
  
  .container {
      max-width: 1200px; /* Или другая максимальная ширина */
      margin: 0 auto;
      padding: 0 20px; /* Отступы по бокам */
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
  }
  
  .header-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 10px; /* Расстояние между logo и button */
  }
  
  .search-container {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 200px;
  }
  
  .search-input {
    flex: 1;
  }
  
  nav ul {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
  }
  
  nav li {
      list-style: none;
  }
  .button-login {
      margin-left: 0;
      padding: 0;
      background: none;
      border: none;
      color: inherit;
  
      font-size:16px;
  }
  </style>
  
  