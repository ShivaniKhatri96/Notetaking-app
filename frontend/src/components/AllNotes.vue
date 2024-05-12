<script setup>
import NoteCard from '../components/NoteCard.vue';
import { useNotesStore } from '@/stores/notesStore';
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { notes } = useNotesStore();
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
console.log(notes[0])
</script>
<template>
    <div class="all-cards">
        <!-- <NoteCard v-for="note in notes[0]?.filter(el => el.user === authStore.user?.userId)" :key="note._id" :noteId="note._id"
            :noteCreator="noteCreators[0]?.find(el => el._id === note.user)?.username || ''" :noteCreatorId="note.user"
            :title="note?.title" :content="note.content" :privacy="note.privacy" /> -->

        <!-- only public notes are shown in home page. However, currently logged in user gets to see their private notes as well -->
        <NoteCard v-for="note in notes[0]?.filter(el => el.privacy === false || el.user === authStore.user?.userId)"
            :key="note._id" :noteId="note._id"
            :noteCreator="noteCreators[0]?.find(el => el._id === note.user)?.username || ''" :noteCreatorId="note.user"
            :title="note?.title" :content="note.content" :privacy="note.privacy" />
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