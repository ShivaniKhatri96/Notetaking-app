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
        //showing the latest created note first
        const reversedData = data.reverse();
        setNotes(reversedData)
        isNotesLoading.value = false;
      }
    } catch (error) {
      console.log('error', error);
    }
  }
})
</script>

<template>
  <main class="home">
    <NoteCreation />
    <Loading v-if="isNotesLoading" />
    <NoDataMessage v-else-if="!notes[0]?.length" message="No notes are currently available. . Create a new note to display here" />
    <AllNotes v-else />
  </main>
</template>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
  height: calc(100vh - var(--navbar-height));
  overflow: auto;
}
</style>
