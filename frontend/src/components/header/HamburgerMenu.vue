<script setup>
import { ref, watchEffect } from "vue";
import { useAuthStore } from '@/stores/auth';

defineProps({
    handleNav: Function,
    navOptions: {
        type: Array,
        required: true,
    }
})
const authStore = useAuthStore();
const menuRef = ref(null);
const iconRef = ref(null);
const isMenuOpen = ref(false)
const handleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}

const outSideMenu = (e) => {
    // if statement works only when clicked 'outside menu' but not including 'hamburger menu icon'
    // this helps to separate  mousedown and @click to avoid the bug related to not closing
    if (isMenuOpen.value && menuRef.value && !menuRef.value.contains(e.target) && iconRef.value && !iconRef.value.contains(e.target)) {
        isMenuOpen.value = false;
    }
};

watchEffect(() => {
    document.addEventListener('mousedown', outSideMenu);
    // Clean up function before running new effect
    return () => {
        document.removeEventListener('mousedown', outSideMenu);
    };
});

</script>
<template>
    <div :class="`hamburger ${isMenuOpen ? 'hamburger-on' : ''}`" @click="handleMenu" ref="iconRef">
    </div>
    <div :class="`menu-background ${isMenuOpen ? 'menu-background-open' : ''}`">
        <div class="menu" ref="menuRef">
            <div class="current-user" @click="handleNav('/my-notes'); handleMenu()">
                <font-awesome-icon :icon="['fas', 'circle-user']" class="user-icon" />
                <span>{{ authStore.user?.username }}</span>
            </div>
            <div v-for="option in navOptions" :key="option.name" @click="handleNav(option.route); handleMenu()"
                class="nav-options">
                <font-awesome-icon :icon="['fas', `${option.icon}`]" />
                <span>{{ option.name }}</span>
            </div>
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
        transition: transform 0.2s ease-in-out;
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
    visibility: hidden;
    top: var(--navbar-height);
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000);
}

.menu-background-open {
    visibility: visible;
    opacity: 1;
    z-index: 0;
}

.menu {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 0.5rem;
    width: 100%;
    background-color: var(--white);
    border-top: solid 2px var(--lighter-gray);
}

.current-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1.5rem;
    font-weight: 600;
}

.user-icon {
    font-size: 4rem;
    color: var(--pink);
}

.nav-options {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .hamburger {
        display: none;
    }

    .menu-background {
        display: none;
    }
}
</style>