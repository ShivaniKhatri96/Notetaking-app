<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';
const { user } = useAuthStore();
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
    <div>
        <div>{{ noteCreators[0]?.find(el => el._id === noteCreatorId).username }}</div>
        <div>Public Note</div>
        <div v-if="noteCreatorId === user.userId">Edit</div>
        <div>{{ title }}</div>
        <div>{{ content }}</div>
    </div>
</template>
<style scoped></style>