<script setup>
import LogInModal from '../components/LogInModal.vue';
import { useStore } from '@/stores/store';
const store = useStore();

const handleLoginClick = () => {
    //toggle
    store.isLoginClick = true;
}
</script>

<template>
    <LogInModal />
    <main class="welcome-box">
        <img alt="post-it picture" class="notes-image" src="@/assets/notes.png" />
        <div class="Noteworthy-box">
            <img alt="logo" class="logo-icon" src="@/assets/logo.png" />
            <h1 class="welcome-title">Ready to embark on a note-taking journey? <br> Log in now to get started!</h1>
            <button class="log-in-button" @click="handleLoginClick">Log in</button>
        </div>
    </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');

.welcome-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    height: calc(100vh - var(--navbar-height));
}

.Noteworthy-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.logo-icon {
    width: 15rem;
}

.welcome-title {
    font-family: "Noto Serif", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings:
        "wdth" 100;
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
}

.notes-image {
    width: 15rem;
}

.log-in-button {
    width: 8rem;
    padding: 0.55rem 0;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    background-color: var(--white);
}

.log-in-button:hover {
    cursor: pointer;
    background-color: var(--light-green-10);
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .welcome-box {
        display: flex;
        flex-direction: row;
    }

    .notes-image {
        width: 20rem;
    }

    .Noteworthy-box {
        display: flex;
        align-items: start;
    }

    .logo-icon {
        width: 20rem;
    }

    .welcome-title {
        text-align: left;
    }
}
</style>