<template>
  <div class="register-modal-overlay" v-if="isOpen">
    <div class="register-modal">
      <div class="register-modal-close" @click="closeModal">
        <button aria-label="Закрыть">
          <img src="@/assets/Close.png" alt="Закрыть" class="register-close-icon">
        </button>
      </div>
      <h2 class="register-modal-title">Регистрация</h2>
      <div v-if="error" class="register-error">{{ error }}</div>
      <form @submit.prevent="submitForm" class="register-form">
        <div class="register-input-container">
          <input type="email" 
                 placeholder="Email" 
                 v-model="email" 
                 required 
                 class="register-input">
        </div>
        <div class="register-input-container">
          <input type="text" 
                 placeholder="Имя пользователя" 
                 v-model="username" 
                 required 
                 class="register-input">
        </div>
        <div class="register-input-container">
          <input type="password" 
                 placeholder="Пароль" 
                 v-model="password" 
                 required 
                 class="register-input">
        </div>
        <button type="submit" 
                :disabled="loading" 
                class="register-submit-button">
          <span v-if="!loading">Зарегистрироваться</span>
          <span v-else>Загрузка...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(["close"]);
const authStore = useAuthStore();

const email = ref("");
const username = ref("");
const password = ref("");
const loading = computed(() => authStore.loading);
const error = computed(() => authStore.error);
const isOpen = computed(() => authStore.isRegisterModalOpen);

const submitForm = async () => {
  await authStore.register(email.value, username.value, password.value);
  if(authStore.isAuthenticated) {
    closeModal();
  }
  email.value = "";
  username.value = "";
  password.value = "";
};

const closeModal = () => {
  emit("close");
  authStore.closeRegisterModal();
  authStore.error = null;
};
</script>

<style scoped>
.register-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.register-modal {
  position: relative;
  background: white;
  padding: 40px;
  border-radius: 8px;
  width: 350px;
  height: 350px;
  max-width: 90%;
  box-shadow: none;
  border:none;
}

.register-modal-close {
  position: absolute;
  top: -1px;
  right: -6px;
  cursor: pointer;
}

.register-close-icon {
  width: 28px;
  height: 28px;
  
  right: 20px;
  transition: opacity 0.2s;
  border: none; /* Убираем границу */
  box-shadow: none;
}
.register-modal-close button {
  /* Добавляем сброс стилей */
  border: none; 
  background: none; 
  outline: none;
}

.register-close-icon:hover {
  opacity: 0.8;
}

.register-modal-title {
  text-align: center;
  margin: 0 0 25px;
  color: #333;
  font-size: 24px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.register-input-container {
  width: 100%;
}

.register-input {
  width: 100%;
  padding: 15px 1px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  padding-left: 5px; 
  padding-right: 5px;
}

.register-input:focus {
  border-color: #666;
  outline: none;
}

.register-submit-button {
  width: auto;    /* Меняем width на auto */
    min-width: 20px; /* Устанавливаем минимальную ширину */
    padding: 12px 20px;
    background: #000;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 10px;
    align-self: center;
}

.register-submit-button:hover {
  background: #333;
}

.register-submit-button:disabled {
  background: #666;
  cursor: not-allowed;
}

.register-error {
  color: #dc3545;
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
}
</style>