<script setup>
import NoteCard from '../components/NoteCard.vue';
import { useNotesStore } from '@/stores/notesStore';
const { notes, setNotes } = useNotesStore();
console.log('notes from allNotes', notes);
</script>
<template>
    <div class="all-cards">
        <NoteCard v-for="note in notes[0]" :key="note._id" :username="note.user" :title="note?.title"
            :content="note.content" />
    </div>
</template>
<style scoped>
.all-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  /* grid-auto-rows: 160px; */
  gap: 1rem;
  /* justify-content: center; */
}</style>