<script setup>
import { useAuthStore } from '@/stores/auth';
const { user } = useAuthStore();
// import { useNotesStore } from '@/stores/notesStore';
// const { notes, setNotes } = useNotesStore();
defineProps({
    noteCreatorId: {
        type: String,
        required: true,
    },
    noteCreator: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})
</script>
<template>
    <div>
        <div>{{ noteCreator }}</div>
        <div>Public Note</div>
        <div v-if="noteCreatorId === user.userId">Edit</div>
        <div>{{ title }}</div>
        <div>{{ content }}</div>
    </div>
</template>
<style scoped></style>