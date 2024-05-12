<script setup>
import { ref, onMounted } from "vue";
import NoDataMessage from '../components/NoDataMessage.vue';
import Loading from '../components/Loading.vue';
import MyNotes from '../components/MyNotes.vue';
import { useAuthStore } from '@/stores/auth';
import { useNotesStore } from '@/stores/notesStore';

const authStore = useAuthStore();
const { notes, setNotes } = useNotesStore();
let isMyNotesLoading = ref(false);

onMounted(async () => {
  if (authStore.token !== null) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authStore.token);
    isMyNotesLoading.value = true;
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
        isMyNotesLoading.value = false;
      }
    } catch (error) {
      console.log('error', error);
    }
  }
})
</script>
<template>
  <div class="notes-page">
    <Loading v-if="isMyNotesLoading" />
    <NoDataMessage v-else-if="!notes[0]?.length" message="You haven't created notes yet" />
    <MyNotes v-else />
  </div>
</template>
