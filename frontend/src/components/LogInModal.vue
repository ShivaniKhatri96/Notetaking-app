<script setup>
import { useStore } from '@/stores/store';
const store = useStore();
</script>

<template>
    <div class="log-in-wrapper" v-if="store.isLoginClick">
        <div class="log-in-modal">
            log in
        </div>
    </div>
</template>

<style scoped>
.log-in-wrapper {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
    z-index: 5;
   /* filter: blur(2px); */
}

.log-in-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: red;
    width: 250px;
    height: 250px;
    z-index: 10;
}
</style>