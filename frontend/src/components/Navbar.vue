<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="navbar">
        <img alt="Notetaking app logo" class="logo" src="@/assets/logo.png" />

        <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
        <div>
            Log in
        </div>
        <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
    </header>
</template>

<style scoped>
.navbar {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem 0 0.4rem;
    background-color: var(--white);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.logo {
    width: 160px;
    height: 50px;
}
</style>
