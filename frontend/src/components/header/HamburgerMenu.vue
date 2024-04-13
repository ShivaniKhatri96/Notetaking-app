<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false)
const handleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>
<template>
    <div :class="`hamburger ${isMenuOpen ? 'hamburger-on' : ''}`" @click="handleMenu">
    </div>
</template>
<style scoped>
/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {

    /* when the menu isn't shown */
    .hamburger,
    .hamburger::before,
    .hamburger::after {
        width: 25px;
        height: 2px;
        background-color: var(--light-gray);
        transition: transform 0.4s ease-in-out;
    }

    .hamburger {
        position: relative;
    }

    .hamburger::before,
    .hamburger::after {
        content: "";
        position: absolute;
        transform: rotate(0);
    }

    .hamburger::before {
        top: -8px;
    }

    .hamburger::after {
        top: 8px;
    }

    /* when the menu is shown */
    .hamburger-on {
        background-color: var(--white);
    }

    .hamburger-on::before {
        top: 0rem;
        transform: rotate(135deg);
    }

    .hamburger-on::after {
        top: 0rem;
        transform: rotate(-135deg);
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .hamburger {
        display: none;
    }
}
</style>