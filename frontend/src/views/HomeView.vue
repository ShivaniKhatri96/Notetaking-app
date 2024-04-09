<script setup>
import { ref, onMounted } from "vue";
import NoteCreation from '../components/NoteCreation.vue';
import AllNotes from '../components/AllNotes.vue';
import NoDataMessage from '../components/NoDataMessage.vue';

import { useNotesStore } from '@/stores/notesStore';

const { notes, setNotes } = useNotesStore();

let isNotesLoading = ref(false);
// change it to true and then false again!!!

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
onMounted(async () => {
  if (authStore.token !== null) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authStore.token);
    try {
      const response = await fetch("http://localhost:8000/api/notes", {
        method: "GET",
        headers: myHeaders,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setNotes(data)
      }
    } catch (error) {
      console.log('error', error);
    }
  }
})
console.log('notes', notes)
</script>

<template>
  <main class="home">
    <NoteCreation />
    <!-- <NoDataMessage message="No notes are currently available" /> -->
    <!-- <font-awesome-icon v-if="isNotesLoading" :icon="['fas', 'spinner']" spin-pulse class="loading-icon" /> -->
    <AllNotes />
  </main>
</template>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 3rem;
  padding: 2rem;
  min-height: calc(100vh - var(--navbar-height));
}
</style>
