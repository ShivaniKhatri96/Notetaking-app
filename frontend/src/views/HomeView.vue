<script setup>
import { ref, onMounted } from "vue";
import NoteCreation from '../components/NoteCreation.vue';
import AllNotes from '../components/AllNotes.vue';
import NoDataMessage from '../components/NoDataMessage.vue';
import Loading from '../components/Loading.vue';
import { useAuthStore } from '@/stores/auth';
import { useNotesStore } from '@/stores/notesStore';

const authStore = useAuthStore();
const { notes, setNotes } = useNotesStore();

let isNotesLoading = ref(false);
// change it to true and then false again!!!


onMounted(async () => {
  if (authStore.token !== null) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authStore.token);
    isNotesLoading.value = true;
    try {
      const response = await fetch("http://localhost:8000/api/notes", {
        method: "GET",
        headers: myHeaders,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setNotes(data)
        isNotesLoading.value = false;
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
    <Loading v-if="isNotesLoading" />
    <NoDataMessage v-else-if="!notes[0]?.length" message="No notes are currently available" />
    <AllNotes v-else />
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
