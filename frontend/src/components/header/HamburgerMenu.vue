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
    <div :class="`menu-background ${isMenuOpen ? 'menu-open' : ''}`">
        <div class="menu">
            hello
        </div>
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

/* menu */
.menu-background {
    position: fixed;
    display: block;
    top: var(--navbar-height);
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    z-index: 0;
    width: 100%;
    height: 100%;
    /* transform: translate(100%); 
   transition: transform 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940); */
    opacity: 0;
    transition: 0.5 cubic-bezier(0.390, 0.575, 0.565, 1.000);
}


.menu {
    width: 100%;
    height: 500px;
    background-color: var(--white);
}

.menu-open {
    /* transform: translateX(0); */
    opacity: 1;
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .hamburger {
        display: none;
    }
}
</style>