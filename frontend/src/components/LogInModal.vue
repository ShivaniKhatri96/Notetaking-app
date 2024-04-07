<script setup>
import { ref } from "vue";
import { useStore } from '@/stores/store';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const authStore = useAuthStore();

const user = ref({
    username: '',
    password: ''
})

const errorMessage = ref("");

const handleSubmit = async () => {
    const { username, password } = user.value;
    try {
        const response = await fetch(
            "http://localhost:8000/api/login",
            {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('noteworthyToken', data.token);
            authStore.login(data.token)
            errorMessage.value = "";
            router.push('/');
            console.log("Successfully logged in");
        }
        else {
            errorMessage.value = "Invalid username or password";
        }
    }
    catch (err) {
        console.log(err);
    };
}

</script>

<template>
    <div class="log-in-background" v-if="store.isLoginClick">
        <div class="log-in-modal">
            <img alt="Large format of logo" class="large-logo" src="@/assets/largeLogo.png" />
            <!-- v-model simplifies the process of binding form input values to the component’s data -->
            <form @submit.prevent="handleSubmit" class="log-in-form">
                <label class="log-in-label">Log in</label>
                <input type="text" placeholder="Username" class="log-in-input" v-model="user.username">
                <input type="password" placeholder="Password" class="log-in-input" v-model="user.password">
                <p class="error-message">{{ errorMessage }}</p>
                <button type="submit" class="log-in-button">Log in</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.log-in-background {
    position: absolute;
    width: 100%;
    height: 100%;
}

.log-in-modal {
    width: 100%;
    height: 100%;
    padding: 1rem;
    background-color: var(--white);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.large-logo {
    /* centers logo */
    display: block;
    margin: auto;
    width: 20rem;

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

.error-message {
    color: var(--red);
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .log-in-background {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(2px);
        z-index: 0;
    }

    .log-in-modal {
        width: 500px;
        height: auto;
        padding: 2rem;
        border-radius: 8px;
        z-index: 10;
    }

    .large-logo {
        width: 25rem;
    }
}
</style>