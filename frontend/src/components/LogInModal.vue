<script setup>
import { useStore } from '@/stores/store';
const store = useStore();
</script>

<template>
    <div class="log-in-wrapper" v-if="store.isLoginClick">log in</div>
</template>

<style scoped>
.log-in-wrapper {
    position: fixed;
    top: 50%;
    /* left: 50%; */
    background-color: red;
    width: 250px;
    height: 250px;
}
</style>