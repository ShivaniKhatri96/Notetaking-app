<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="180" height="100" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>
