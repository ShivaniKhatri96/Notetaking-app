<script setup>
import { useStore } from '@/stores/store';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';
import { watch } from 'vue';
import UserMenu from './UserMenu.vue';
import HamburgerMenu from './HamburgerMenu.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const authStore = useAuthStore();

const handleLoginClick = () => {
    //toggle
    store.isLoginClick = true;
}

const navOptions = [{ name: 'My notes', route: '/my-notes', icon: 'user' }, { name: 'Log out', route: '/welcome', icon: 'right-from-bracket' }];

const handleNav = (route) => {
    // for log out
    if (route === '/welcome') {
        localStorage.removeItem('noteworthyToken');
        localStorage.removeItem('noteworthyUser');
        authStore.logout()
    }
    //for all routes
    router.push(route);
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
</script>

<template>
    <header class="navbar">
        <RouterLink to="/">
            <img alt="Notetaking app logo" class="logo" src="@/assets/logo.png" />
        </RouterLink>
        <div v-if="!authStore.token" class="login-wrapper" @click="handleLoginClick">
            <font-awesome-icon :icon="['fas', 'right-to-bracket']" class="log-in-icon" />Log in
        </div>
        <div v-else>
            <!-- for larger screen sizes -->
            <UserMenu :handleNav="handleNav" :navOptions="navOptions" />
            <!-- for mobile versions -->
            <HamburgerMenu :handleNav="handleNav" :navOptions="navOptions" />
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

.logo:hover {
    animation: heartbeat 1.5s ease-in-out both;
}

@keyframes heartbeat {
    from {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }

    10% {
        -webkit-transform: scale(0.91);
        transform: scale(0.91);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }

    17% {
        -webkit-transform: scale(0.98);
        transform: scale(0.98);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }

    33% {
        -webkit-transform: scale(0.87);
        transform: scale(0.87);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }

    45% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
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
</style>
