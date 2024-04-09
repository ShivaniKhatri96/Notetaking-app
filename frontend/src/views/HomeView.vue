<script setup>
import { ref, onMounted } from "vue";
import NoteCreation from '../components/NoteCreation.vue';
import AllNotes from '../components/AllNotes.vue';
import NoDataMessage from '../components/NoDataMessage.vue';
// const elem = ref();

onMounted(() => {
  fetch("http://localhost:8000/api/notes")
  .then(response => response.json())
  .then(result => console.log('result', result))
  .catch(error => console.log('error', error));
})
</script>

<template>
  <main class="home">
   <NoteCreation />
   <NoDataMessage message="No notes are currently available"/>
   <!-- <AllNotes /> -->
  </main>
</template>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
}
</style>
