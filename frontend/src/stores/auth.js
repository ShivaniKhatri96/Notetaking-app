import { defineStore } from 'pinia';

// Parsing the string back to an object
const loggedUserString = localStorage.getItem('noteworthyUser');
const loggedUser = JSON.parse(loggedUserString);

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('noteworthyToken') || null,
        user: loggedUser || null
    }),
    // Actions 
    actions: {
        login(token) {
            this.token = token;
        },
        setUser(user) {
            this.user = user;
        },
        logout() {
            this.token = null;
            this.user = null;
        }
    }
});