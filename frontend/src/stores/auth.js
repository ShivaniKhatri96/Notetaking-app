import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null || localStorage.getItem('noteworthyToken'),
    }),
    // Actions 
    actions: {
        login(token) {
            this.token = token;
        },
        logout() {
            this.token = null;
        }
    }
});