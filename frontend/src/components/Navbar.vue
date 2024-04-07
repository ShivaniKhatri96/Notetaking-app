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
    authStore.logout()
    router.push('/welcome');
}

//The arrow function '() => authStore.token' is evaluated every time the authStore.token property changes
watch(() => authStore.token, () => {
    console.log('token token')
})

</script>

<template>
    <header class="navbar">
        <img alt="Notetaking app logo" class="logo" src="@/assets/logo.png" />

        <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
        <div v-if="!authStore.token" class="login-wrapper" @click="handleLoginClick">
            <font-awesome-icon :icon="['fas', 'right-to-bracket']" class="log-in-icon" />Log in
        </div>
        <div v-else @click="handleLogoutClick">
            logout
        </div>

    </header>
</template>

<style scoped>
.navbar {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem 0 0.4rem;
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
</style>
