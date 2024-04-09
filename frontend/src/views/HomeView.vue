<script setup>
import { ref, onMounted } from "vue";
import NoteCreation from '../components/NoteCreation.vue';
import AllNotes from '../components/AllNotes.vue';
import NoDataMessage from '../components/NoDataMessage.vue';

// import { useStore } from '@/stores/store';
// const store = useStore();
// console.log(store.AllNotes)

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

let isNotesLoading = ref(false);
// change it to true and then false again!!!
console.log('isNotesLoading', isNotesLoading);


const fetchAllNotes = async () => {
  // isNotesLoading.value = true;
  try {
    const response = await fetch("http://localhost:8000/api/notes")
    if (response.ok) {
      const data = await response.json();
      // isNotesLoading.value = true;
      console.log('data', data);
      console.log('isNotesLoading', isNotesLoading);
    }
  } catch (erorr) {
    console.log('error', error);
  }
}
onMounted(() => {
    fetchAllNotes();
} )

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
