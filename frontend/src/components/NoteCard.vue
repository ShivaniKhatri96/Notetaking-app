<script setup>
import { ref } from "vue";
import ContextMenu from './ContextMenu.vue';
import { useAuthStore } from '@/stores/auth';
import { useNotesStore } from '@/stores/notesStore';
import EditNoteCard from "./EditNoteCard.vue";
import { useStore } from "@/stores/store";
const props = defineProps({
    noteId: {
        type: String,
        required: true,
    },
    noteCreator: {
        type: String,
        required: true,
    },
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
const { token, user } = useAuthStore();
const { removeNotes } = useNotesStore();
const store = useStore();
const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const handleContextMenu = () => {
    menuX.value = 5;
    menuY.value = 28;
    showMenu.value = !showMenu.value;
}
const outsideContextMenu = () => {
    if (showMenu.value) {
        showMenu.value = false;
    }
}

const handleDeleteNote = async (noteId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    try {
        const response = await fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        if (response.ok) {
            removeNotes(noteId)
            showMenu.value = false;
        }
    } catch (error) {
        console.log('error', error);
    }
}

const handleEditMode = (noteId) => {
    showMenu.value = false;
    store.editMode = noteId
}
</script>
<template>
    <div class="card">
        <div :class="`card-header ${noteCreatorId === user?.userId ? 'current-user' : 'other-users'}`">
            <div class="flex-row">
                <img alt="placeholder image to represent note creator" class="note-creator-icon"
                    src="@/assets/person.png" />
                <div class="note-creator">
                    <div class="note-creator-name">{{ noteCreator }}</div>
                    <div :class="`public-box ${noteCreatorId === user?.userId ? 'current-user' : ''}`">
                        <font-awesome-icon :icon="['fas', 'user-group']" /> . Public Note
                    </div>
                </div>
            </div>
            <div v-if="noteCreatorId === user?.userId" v-click-outside="outsideContextMenu"
                :class="`${showMenu ? 'ellipsis-box' : ''}`">
                <div @click="handleContextMenu" class="ellipsis">
                    <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
                </div>
                <ContextMenu :showMenu="showMenu" :menuX="menuX" :menuY="menuY">
                    <div class="context-menu-item" @click="handleDeleteNote(noteId)">Delete note</div>
                    <div class="context-menu-item" @click="handleEditMode(noteId)">Edit note</div>
                    <div class="context-menu-item">Turn private</div>
                </ContextMenu>
            </div>
            <EditNoteCard :noteId="noteId" :title="title" :content="content" />
        </div>
        <div class="content-box">
            <div class="note-title">{{ title }}</div>
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
    height: 350px;
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
}

.note-creator {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

.note-creator-icon {
    color: var(--light-gray);
    width: 35px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 50%;
    background-color: var(--white);
}

.note-creator-name {
    font-weight: 700;
}

.public-box {
    font-size: 0.65rem;
    color: var(--gray);
}

.current-user {
    background-color: var(--pink);
    color: var(--white);
}

.other-users {
    background-color: var(--lighter-gray);
}

.note-icon-button {
    font-size: 0.65rem;
    font-weight: 700;
    background-color: var(--white-10);
    padding: 0.25rem 0.4rem;
    border: solid 1px var(--white-20);
    border-radius: 4px;
    color: var(--white);
}

.note-icon-button:hover {
    cursor: pointer;
    background-color: var(--white-20);
}

.note-icon-button:disabled,
.note-icon-button:hover:disabled {
    cursor: auto;
    background-color: var(--white-10);
    opacity: 0.65;
}

.content-box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    overflow: auto;
    font-size: 0.9rem;
}

.note-title {
    font-weight: 600;
}

.ellipsis-box {
    position: relative;
}

.ellipsis {
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
}

.ellipsis:hover {
    background-color: var(--white-10);
    cursor: pointer;
}
</style>