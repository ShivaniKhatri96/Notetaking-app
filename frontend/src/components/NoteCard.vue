<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from '@/stores/auth';
import { useNotesStore } from '@/stores/notesStore';
const { token, user } = useAuthStore();
const { notes, removeNotes, updateNotes } = useNotesStore();
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
        }
    } catch (error) {
        console.log('error', error);
    }
}

const isEditMode = ref(false);
const handleEditMode = () => {
    isEditMode.value = true;

    console.log('note:', updateNote.value);
}

const updateNote = ref({
    title: props?.title,
    content: props?.content
});

const handleSave = async (noteId) => {
    const { title, content } = updateNote.value;
    console.log('title', title)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    try {
        const response = await fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: "PUT",
            body: JSON.stringify({
                title,
                content,
            }),
            headers: myHeaders,
        })
        if (response.ok) {
            console.log('update:', updateNote.value);
            updateNotes(noteId, title, content);
            console.log('updated notes:', notes)
            isEditMode.value = false;
        }
    } catch (error) {
        console.log('error', error);
    }
};

const handleCancel = () => {
    updateNote.value.title = props?.title;
    updateNote.value.content = props?.content;
    isEditMode.value = false;
};
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
            <div v-if="noteCreatorId === user?.userId">
                <div class="flex-row" v-if="isEditMode">
                    <button class="note-icon-button" @click="handleSave(noteId)"
                        :disabled="!updateNote.content.length"><font-awesome-icon :icon="['fas', 'floppy-disk']" />
                        Save</button>
                    <button class="note-icon-button" @click="handleCancel">Cancel</button>
                </div>
                <div class="flex-row" v-else>
                    <button class="note-icon-button" @click="handleEditMode"><font-awesome-icon
                            :icon="['fas', 'pen-to-square']" /> Edit</button>
                    <button class="note-icon-button" @click="handleDeleteNote(noteId)"><font-awesome-icon
                            :icon="['fas', 'trash-can']" /> Delete</button>
                </div>
            </div>
        </div>
        <div class="content-box" v-if="isEditMode">
            <input class="update-note-input" type="text" placeholder="Title" v-model="updateNote.title" />
            <textarea @click="handleClick" class="update-note-input" rows="13" placeholder="Take a note..."
                v-model="updateNote.content"></textarea>
        </div>
        <div class="content-box" v-else>
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

.update-note-input {
    width: 100%;
    border: none;
    border-radius: 4px;
    background-color: var(--lighter-gray);
    padding: 0.5rem;
}

.update-note-input:focus {
    outline: none;
}
</style>