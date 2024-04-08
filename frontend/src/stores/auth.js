import { defineStore } from 'pinia';

// Parsing the string back to an object
const loggedUserString = localStorage.getItem('noteworthyUser');
const loggedUser = JSON.parse(loggedUserString);

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null || localStorage.getItem('noteworthyToken'),
        user: null || loggedUser
    }),
    // Actions 
    actions: {
        login(token) {
            this.token = token;
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