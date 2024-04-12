<script setup>
import { useStore } from '@/stores/store';
import { useAuthStore } from '@/stores/auth';
import { useRouter, RouterLink } from 'vue-router';
import { ref, watch } from 'vue';
import ContextMenu from './ContextMenu.vue';

const router = useRouter();
const store = useStore();
const authStore = useAuthStore();

const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const userRef = ref(null);

const handleLoginClick = () => {
    //toggle
    store.isLoginClick = true;
}

const handleLogoutClick = () => {
    localStorage.removeItem('noteworthyToken');
    localStorage.removeItem('noteworthyUser');
    authStore.logout()
    showMenu.value = false;
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

const handleMyNotes = () => {
    showMenu.value = false;
    router.push('/my-notes');
}

// const showContextMenu = (event) => {
//     event.preventDefault();
//     console.log('event', event)
//     menuX.value = event.clientX;
//     menuY.value = event.clientY;
//     // showMenu.value = true;
//     showMenu.value = !showMenu.value;
//     // console.log('event', event)
// };
const showContextMenu = () => {
    const rect = userRef.value.getBoundingClientRect();
    menuX.value = rect.left;
    menuY.value = rect.top + 40;
    showMenu.value = !showMenu.value;
};

const outsideContextMenu = () => {
    if (showMenu.value = true) {
        showMenu.value = false;
    }
}
</script>

<template>
    <header class="navbar">
        <RouterLink to="/">
            <img alt="Notetaking app logo" class="logo" src="@/assets/logo.png" />
        </RouterLink>
        <div v-if="!authStore.token" class="login-wrapper" @click="handleLoginClick">
            <font-awesome-icon :icon="['fas', 'right-to-bracket']" class="log-in-icon" />Log in
        </div>
        <div v-else v-click-outside="outsideContextMenu">
            <div @click="showContextMenu" class="user-nav" ref="userRef">
                <font-awesome-icon :icon="['fas', 'circle-user']" class="user-icon" />
                <span>{{ authStore.user?.username }}</span>
                <font-awesome-icon :icon="['fas', 'angle-down']" />
            </div>
            <!-- There is some bug with this reusable contextMenu. I will fix it in Version 2 of this project (in a different branch) -->
            <ContextMenu :showMenu="showMenu" :menuX="menuX" :menuY="menuY">
                <div @click="handleMyNotes" class="context-menu-item">
                    <font-awesome-icon :icon="['fas', 'user']" /> My notes
                </div>
                <div @click="handleLogoutClick" class="context-menu-item">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" /> Log out
                </div>
            </ContextMenu>
        </div>
    </header>
</template>

<style scoped>
.navbar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--navbar-height);
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
