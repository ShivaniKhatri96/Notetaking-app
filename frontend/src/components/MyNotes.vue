<script setup>
import NoteCard from '../components/NoteCard.vue';
import { useNotesStore } from '@/stores/notesStore';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { notes } = useNotesStore();
</script>
<template>
    <div class="all-cards-box">
        <p class="all-cards-title">My Notes</p>
        <div class="all-cards">
            <NoteCard v-for="note in notes[0]?.filter(el => el.user === authStore.user?.userId)" :key="note._id"
                :noteId="note._id" :noteCreator="authStore.user?.username" :noteCreatorId="note.user"
                :title="note?.title" :content="note.content" :privacy="note.privacy" />
        </div>
    </div>
</template>