<script setup>
import { useStore } from '@/stores/store';
import { useAuthStore } from '@/stores/auth';
import { useRouter, RouterLink } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRouter();
const store = useStore();
const authStore = useAuthStore();

const handleLoginClick = () => {
    //toggle
    store.isLoginClick = true;
}

const handleLogoutClick = () => {
    localStorage.removeItem('noteworthyToken');
    localStorage.removeItem('noteworthyUser');
    authStore.logout()
    router.push('/welcome');
}

//The arrow function '() => authStore.token' is evaluated every time the authStore.token property changes
watch(() => authStore.token, async () => {
    if (authStore.token !== null) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", authStore.token);
        try {
            const response = await fetch("http://localhost:8000/api/me", {
                method: "GET",
                headers: myHeaders,
            });
            if (response.ok) {
                const data = await response.json();
                // stringifying the object to store in localStorage
                const currentUser = JSON.stringify(data);
                localStorage.setItem('noteworthyUser', currentUser);
                authStore.setUser(data);
            } else {
                console.log("Error fetching current user");
            }
        } catch (err) {
            console.log(err);
        }
    }
})


import ContextMenu from './ContextMenu.vue';

const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const handleCurrentUser = () => {
    console.log('clicked current user');
    showMenu.value = true;
}

const showContextMenu = (event) => {
    event.preventDefault();
    menuX.value = event.clientX;
    menuY.value = event.clientY;
    showMenu.value = true;
    console.log(menuX.value, menuY.value);
};

</script>

<template>
    <ContextMenu :showMenu="showMenu" :menuX="menuX" :menuY="menuY">
        <div @click="handleLogoutClick">
            logout
        </div>
    </ContextMenu>
    <header class="navbar">
        <RouterLink to="/">
            <img alt="Notetaking app logo" class="logo" src="@/assets/logo.png" />
        </RouterLink>

        <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
    <button @click="showContextMenu">click me!</button>
        <div v-if="!authStore.token" class="login-wrapper" @click="handleLoginClick">
            <font-awesome-icon :icon="['fas', 'right-to-bracket']" class="log-in-icon" />Log in
        </div>
        <div v-else>
            <div @click="handleCurrentUser" class="user-nav">
                <font-awesome-icon :icon="['fas', 'circle-user']" class="user-icon" />
                <span>{{ authStore.user?.username }}</span>
                <font-awesome-icon :icon="['fas', 'angle-down']" />
            </div>
            <!-- <div @click="handleLogoutClick">
                logout
            </div> -->
        </div>
    </header>
</template>

<style scoped>
.navbar {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem 0 0.4rem;
    background-color: var(--white);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.logo {
    width: 160px;
    height: 50px;
}

.login-wrapper {
    font-weight: 600;
}

.login-wrapper:hover {
    cursor: pointer;
    color: var(--black);
}

.log-in-icon {
    padding-right: 0.5rem;
}

.user-nav {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    padding: 0.4rem;
    border-radius: 4px;
    font-weight: 600;
}

.user-nav:hover {
    cursor: pointer;
    background-color: var(--background-color);
}

.user-icon {
    color: var(--pink);
    font-size: 1.4rem;
}
</style>
