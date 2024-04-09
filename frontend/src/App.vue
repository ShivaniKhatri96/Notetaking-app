<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

import { ref, onMounted, watch } from "vue";
import { useNotesStore } from '@/stores/notesStore';
const { notes, addNotes } = useNotesStore();

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
watch(() => authStore.token, async () => {
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
        addNotes(data)
      }
    } catch (error) {
      console.log('error', error);
    }
  }
})
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
