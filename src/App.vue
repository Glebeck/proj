<template>
  <Header />
  <main>
    
    <AuthModal />
    <router-view />
  </main>
</template>

<script setup>
import Header from "./components/Header.vue";
import AuthModal from "./components/AuthModal.vue";
</script>

