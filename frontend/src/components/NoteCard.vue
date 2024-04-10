<script setup>
// import { useNotesStore } from '@/stores/notesStore';
// const { notes, setNotes } = useNotesStore();
defineProps({
    username: {
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
        <div>{{ username }}</div>
        <div>private or public note??</div>
        <div>{{ title }}</div>
        <div>{{ content }}</div>
    </div>
</template>
<style scoped></style>