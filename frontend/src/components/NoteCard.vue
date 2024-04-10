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
        <div :class="`card-header ${noteCreatorId === user?.userId ? 'current-user' : 'other-users'}`">
            <div class="flex-row">
                <img alt="placeholder image to represent note creator" class="note-creator-icon"
                    src="@/assets/person.png" />
                <div class="note-creator">
                    <div>{{ noteCreator }}</div>
                    <div>Public Note</div>
                </div>
            </div>
            <div v-if="noteCreatorId === user?.userId" class="flex-row">
                <div>Edit</div>
                <div>Delete</div>
            </div>

        </div>
        <div class="content-box">
            <div>{{ title }}</div>
            <div>{{ content }}</div>
        </div>
    </div>
</template>
<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    height: 300px;
    overflow: auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

.flex-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    /* font-weight: 700; */
}

.note-creator-icon {
    font-size: 2.5rem;
    color: var(--light-gray);
    width: 35px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 50%;
    background-color: var(--white);
}

.current-user {
    background-color: var(--light-green-10);
}

.other-users {
    background-color: var(--lighter-gray);
}

.content-box {
    padding: 1rem;
    overflow: auto;
}
</style>