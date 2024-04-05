<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="navbar">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="160" height="50" />

        <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
    </header>
</template>

<style scoped>
.navbar {
    background-color: var(--white);
    padding: 0.4rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
