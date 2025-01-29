import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        isOpen: false,
        isRegisterModalOpen: false,
        loading: false,
        error: null,
    }),
    getters: {
        isLoggedIn: (state) => state.isAuthenticated
    },
    actions: {
         async register(email, username, password) {
             this.loading = true;
              this.error = null;
            try {
              const response = await axios.post('/api/register', { email, username, password });
               if(response.data.token) {
                    this.token = response.data.token;
                     localStorage.setItem('token', this.token);
                     await this.fetchUser()
                   this.isAuthenticated = true;
               } else {
                   this.error = "Ошибка регистрации"
               }
             } catch (error) {
                this.error = error.response.data.message || "Ошибка регистрации";
             } finally {
                 this.loading = false;
             }
        },
        async login(username, password) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post('/api/login', { username, password });
                if(response.data.token) {
                      this.token = response.data.token;
                     localStorage.setItem('token', this.token);
                    await this.fetchUser();
                     this.isAuthenticated = true;
                   } else {
                      this.error = "Неверный логин или пароль"
                   }
            } catch (error) {
              this.error = error.response.data.message || "Ошибка авторизации";
            } finally {
                this.loading = false;
            }
        },
         async fetchUser() {
             this.loading = true;
            try {
                  const response = await axios.get('/api/user', {
                        headers: {
                           Authorization: `Bearer ${this.token}`
                        }
                    })
                    this.user = response.data;
                } catch (error) {
                   this.error = error.response.data.message || "Ошибка загрузки пользователя"
                   this.logout();
                } finally {
                    this.loading = false;
                }
       },
        async logout() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            localStorage.removeItem('token');
           await axios.post('/api/logout');
        },
      openModal() {
        this.isOpen = true;
         this.error = null;
      },
      closeModal() {
        this.isOpen = false;
      },
     openRegisterModal() {
          this.isRegisterModalOpen = true;
          this.error = null;
        },
    closeRegisterModal() {
         this.isRegisterModalOpen = false;
        },
    },
});

