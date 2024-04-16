<script setup>
import { ref, watchEffect } from "vue";
import { useAuthStore } from '@/stores/auth';

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
            menu
            <!-- <font-awesome-icon :icon="['fas', 'circle-user']" class="user-icon" />
            <span>{{ authStore.user?.username }}</span>
            <div @click="handleMyNotes" class="context-menu-item">
                <font-awesome-icon :icon="['fas', 'user']" /> My notes
            </div>
            <div @click="handleLogoutClick" class="context-menu-item">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" /> Log out
            </div> -->
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
    /* z-index: 100; */
}

.menu {
    width: 100%;
    height: 500px;
    background-color: var(--lighter-gray);
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