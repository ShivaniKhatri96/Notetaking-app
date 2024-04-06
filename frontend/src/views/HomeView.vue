<script setup>
import { ref, onMounted } from "vue";

// const elem = ref();

onMounted(() => {
  fetch("http://localhost:8000/api/users")
  .then(response => response.json())
  .then(result => console.log('result', result))
  .catch(error => console.log('error', error));
})
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    bla bla

  </main>
</template>
