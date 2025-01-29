<template>
    <div class="auth-modal-overlay" v-if="isOpen">
      <div class="auth-modal">
        <div class="auth-modal-close" @click="closeModal">
          <button>
            <img src="@/assets/Close.png" alt="Close" class="close-icon-image">
          </button>
        </div>
        <h2>Авторизация</h2>
        <div v-if="error" class="auth-error">{{ error }}</div>
        <form @submit.prevent="submitForm">
          <div class="input-container">
            <input type="text" placeholder="Имя пользователя" v-model="username" required />
          </div>
          <div class="input-container">
            <input type="password" placeholder="Пароль" v-model="password" required />
          </div>
          <button type="submit" :disabled="loading" class="auth-modal-button">
            <span v-if="!loading">Войти</span>
            <span v-else>Загрузка...</span>
          </button>
          <div class="remember">
            <label>
              <input type="checkbox" id="remember" />
              Запомнить меня
            </label>
            <a href="#" class="forgot-password">Забыли пароль?</a>
          </div>
          <div class="register-link">
            <p>
            Нет аккаунта?
             <a href="#" @click.prevent="openRegisterModal">Зарегистрироваться</a>
            </p>
          </div>
        </form>
      </div>
        <RegisterModal v-if="isRegisterModalOpen" @close="closeRegisterModal" />
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, computed } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import RegisterModal from "./RegisterModal.vue";
  const emit = defineEmits(["close"]);
  const authStore = useAuthStore();
  const username = ref("");
  const password = ref("");
  const loading = computed(() => authStore.loading);
  const error = computed(() => authStore.error);
  const isOpen = computed(() => authStore.isOpen);
  const isRegisterModalOpen = computed(() => authStore.isRegisterModalOpen);
  
  
  const submitForm = async () => {
    await authStore.login(username.value, password.value);
    if (authStore.isAuthenticated) {
      closeModal();
    }
    username.value = "";
    password.value = "";
  };
  
  const closeModal = () => {
    emit("close");
    authStore.closeModal();
    authStore.error = null;
  };
  const openRegisterModal = () => {
    authStore.openRegisterModal();
  };
  const closeRegisterModal = () => {
       authStore.closeRegisterModal()
  };
  </script>
  
  <style >
  .auth-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.auth-modal {
  position: relative;
  background-color: white;
  padding: 50px 60px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}
.auth-modal-close {
  position: absolute;
  top: 1px;
  right: 7px;
  width: 28px;
  height: 28px; 
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-input-container {
  margin: 5px 0;
}
.register-link a{
  top: 100px;
}
.close-icon-image{
  width: 28px;
  height: 28px;
  position: relative;
  top:1px;
  right:-7px;
  
}
.register-submit-button {
  margin-top: 30px; 
}
.register-form {
  margin-top: 30px; 
  display: flex;
  flex-direction: column;
  gap: 25px; 
}
.register-form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px; 
}
.auth-modal-close button {
  font-size: 1.5em;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  line-height: 1;
  font-weight: bold;
  padding: 0;
  margin: 0;
}
.register-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.register-link > a {
  text-decoration: underline;
  margin: 0;
}
.auth-error {
  color: red;
  margin-bottom: 10px;
  text-align: center;
}
.input-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.auth-modal input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80%;
  box-sizing: border-box;
}
.remember {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 15px 0;
}
.remember label {
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.remember input[type="checkbox"] {
  margin-right: 5px;
}
.remember > label,
.remember > a {
  margin: 0 40px;
  white-space: nowrap;
}
.auth-modal-button {
    background-color: #000000;
    color: white;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 7px;
    cursor: pointer;
    border: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.register-link a{
    color: blue;
    font-weight: 700;
}
</style>
  
  
  