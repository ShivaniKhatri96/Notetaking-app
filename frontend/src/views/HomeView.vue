<script setup>
import { ref, onMounted } from "vue";
import NoteCreation from '../components/NoteCreation.vue';
// const elem = ref();

onMounted(() => {
  fetch("http://localhost:8000/api/notes")
  .then(response => response.json())
  .then(result => console.log('result', result))
  .catch(error => console.log('error', error));
})
</script>

<template>
  <main>
   <NoteCreation />
  </main>
</template>
