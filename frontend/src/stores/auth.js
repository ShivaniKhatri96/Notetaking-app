import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        // Other state properties...
    }),
    // Actions and getters...
});