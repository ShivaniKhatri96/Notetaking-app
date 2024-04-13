<script setup>
import ContextMenu from '../ContextMenu.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const { user, logout } = useAuthStore();
const router = useRouter();
const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const userRef = ref(null);

const handleMyNotes = () => {
    showMenu.value = false;
    router.push('/my-notes');
}

const handleLogoutClick = () => {
    localStorage.removeItem('noteworthyToken');
    localStorage.removeItem('noteworthyUser');
    logout()
    showMenu.value = false;
    router.push('/welcome');
}

// const showContextMenu = (event) => {
//     event.preventDefault();
//     console.log('event', event)
//     menuX.value = event.clientX;
//     menuY.value = event.clientY;
//     // showMenu.value = true;
//     showMenu.value = !showMenu.value;
//     // console.log('event', event)
// };
const showContextMenu = () => {
    const rect = userRef.value.getBoundingClientRect();
    menuX.value = window.innerWidth - rect.right;
    menuY.value = rect.top + 40;
    showMenu.value = !showMenu.value;
};

const outsideContextMenu = () => {
    if (showMenu.value = true) {
        showMenu.value = false;
    }
}
</script>
<template>
    <div v-click-outside="outsideContextMenu" class="user-menu">
        <div @click="showContextMenu" class="user-nav" ref="userRef">
            <font-awesome-icon :icon="['fas', 'circle-user']" class="user-icon" />
            <span>{{ user?.username }}</span>
            <font-awesome-icon :icon="['fas', 'angle-down']" />
        </div>
        <ContextMenu :showMenu="showMenu" :menuX="menuX" :menuY="menuY">
            <div @click="handleMyNotes" class="context-menu-item">
                <font-awesome-icon :icon="['fas', 'user']" /> My notes
            </div>
            <div @click="handleLogoutClick" class="context-menu-item">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" /> Log out
            </div>
        </ContextMenu>
    </div>
</template>
<style scoped>
.user-nav {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    padding: 0.4rem;
    border-radius: 4px;
    font-weight: 600;
}

.user-nav:hover {
    cursor: pointer;
    background-color: var(--background-color);
}

.user-icon {
    color: var(--pink);
    font-size: 1.4rem;
}

/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {
    .user-menu {
        display: none;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .user-menu {
        display: block;
    }
}
</style>