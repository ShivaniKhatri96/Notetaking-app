<script setup>
import NoteCard from '../components/NoteCard.vue';
import { useNotesStore } from '@/stores/notesStore';
import { ref, onMounted } from "vue";

const { notes, setNotes } = useNotesStore();

let noteCreators = ref([]);
onMounted(async () => {
    try {
        const response = await fetch("http://localhost:8000/api/users");
        if (response.ok) {
            const data = await response.json();
            noteCreators.value.push(data)
        }
    } catch (error) {
        console.log('error', error);
    }
})
</script>
<template>
    <div class="all-cards">
        <NoteCard v-for="note in notes[0]" :key="note._id" :noteId="note._id"
            :noteCreator="noteCreators[0]?.find(el => el._id === note.user)?.username || ''" :noteCreatorId="note.user"
            :title="note?.title" :content="note.content" />
    </div>
</template>
<style scoped>
.all-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    gap: 1rem;
    justify-content: center;
}
</style>