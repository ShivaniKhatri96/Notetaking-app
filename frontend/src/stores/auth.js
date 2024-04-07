import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null || localStorage.getItem('noteworthyToken'),
        user: null || localStorage.getItem('noteworthyUser')
    }),
    // Actions 
    actions: {
        login(token) {
            this.token = token;
            // this.user = user;
        },
        currentUser(user) {
            this.user = user;
        },
        logout() {
            this.token = null;
            this.user = null;
        }
    }
});