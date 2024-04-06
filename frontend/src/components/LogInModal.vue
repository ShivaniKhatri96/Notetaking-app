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
                <label>Log in</label>
                <input type="text" placeholder="Username">
                <input type="text" placeholder="Password">
                <button type="submit">Log in</button>
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
    backdrop-filter: blur(1px);
    z-index: 0;
}

.log-in-modal {
    position: fixed;
    background-color: var(--white);
    width: 500px;
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
</style>