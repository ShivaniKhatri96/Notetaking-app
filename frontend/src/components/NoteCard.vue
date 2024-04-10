<script setup>
// import { useNotesStore } from '@/stores/notesStore';
// const { notes, setNotes } = useNotesStore();

defineProps({
    noteCreatorId: {
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

import { useAuthStore } from '@/stores/auth';
const { user } = useAuthStore();
//get all noteCreators here... 
//then find the user with noteCreatorId to add below
console.log('user', user)
</script>
<template>
    <div>
        <div>{{ noteCreatorId }}</div>
        <div>Public Note</div>
        <div v-if="noteCreatorId === user.userId">Edit</div>
        <div>{{ title }}</div>
        <div>{{ content }}</div>
    </div>
</template>
<style scoped></style>