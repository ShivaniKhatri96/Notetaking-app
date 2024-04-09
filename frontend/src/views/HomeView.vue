<script setup>
import { ref, onMounted } from "vue";
import NoteCreation from '../components/NoteCreation.vue';
import AllNotes from '../components/AllNotes.vue';
import NoDataMessage from '../components/NoDataMessage.vue';
const isNotesLoading = ref(false);
// change it to true and then false again!!!

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:8000/api/notes")
    if (response.ok) {
      const data = await response.json();
      console.log('data', data);
    }
  } catch (erorr) {
    console.log('error', error);
  }
})
</script>

<template>
  <main class="home">
    <NoteCreation />
    <!-- <NoDataMessage message="No notes are currently available" /> -->
    <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="loading-icon" />
    <AllNotes />
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
  min-height: calc(100vh - var(--navbar-height));
}
</style>
