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
    <div class="card">
        <div>{{ noteCreator }}</div>
        <div>Public Note</div>
        <div v-if="noteCreatorId === user?.userId">Edit</div>
        <div>{{ title }}</div>
        <div>{{ content }}</div>
    </div>
</template>
<style scoped>
.card {
    background-color: var(--light-green-5);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>