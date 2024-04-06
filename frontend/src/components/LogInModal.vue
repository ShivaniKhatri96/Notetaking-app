<script setup>
import { useStore } from '@/stores/store';
const store = useStore();
const handleSubmit = () => {
    console.log('submitted')
}
</script>

<template>
    <div class="log-in-background" v-if="store.isLoginClick">
        <div class="log-in-modal">
            <img alt="Large format of logo" class="large-logo" src="@/assets/largeLogo.png" />
            <form @submit.prevent="handleSubmit" class="log-in-form">
                <label class="log-in-label">Log in</label>
                <input type="text" placeholder="Username" class="log-in-input">
                <input type="password" placeholder="Password" class="log-in-input">
                <button type="submit" class="log-in-button">Log in</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.log-in-background {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    z-index: 0;
}

.log-in-modal {
    width: 500px;
    padding: 2rem;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 10;
}

.large-logo {
    width: 25rem;
}

.log-in-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.log-in-label {
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
}

.log-in-input {
    padding: 0.4rem;
    border: solid 2px var(--gray);
    border-radius: 4px;
}

.log-in-button {
    padding: 0.4rem;
    border-radius: 4px;
    border: solid 2px var(--light-green);
    background-color: var(--light-green);
    color: var(--white);
    font-weight: 600;
    font-size: 0.9rem;
}

.log-in-button:hover {
    cursor: pointer;
    background-color: var(--light-green-80);
}
</style>