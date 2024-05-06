<script setup>
import { ref, watchEffect } from "vue";
import { useNotesStore } from '@/stores/notesStore';
import { useStore } from "@/stores/store";
import { useAuthStore } from '@/stores/auth';
const props = defineProps({
    noteId: {
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
const { token } = useAuthStore();
const { updateNotes } = useNotesStore();
const store = useStore();
const updateNote = ref({
    title: props?.title,
    content: props?.content
});
const handleSave = async (noteId) => {
    const { title, content } = updateNote.value;
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
            updateNotes(noteId, title, content);
            store.editMode = ''
        }
    } catch (error) {
        console.log('error', error);
    }
};

const handleCancel = () => {
    updateNote.value.title = props?.title;
    updateNote.value.content = props?.content;
    store.editMode = ''
};
const editModalRef = ref(null)
const handleClickOutside = (e) => {
    if (store.editMode === props.noteId && editModalRef.value && !editModalRef.value.contains(e.target)) {
        handleCancel()
    }
};

watchEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    // Clean up function before running new effect
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
});
</script>

<template>
    <div class="edit-note-background" v-if="store.editMode === noteId">
        <div class="edit-note-modal" ref="editModalRef">
            <input class="update-note-input" type="text" placeholder="Title" v-model="updateNote.title" />
            <textarea class="update-note-input" rows="25" placeholder="Take a note..."
                v-model="updateNote.content"></textarea>
            <div class="flex-row">
                <button class="note-icon-button" @click="handleSave(noteId)"
                    :disabled="!updateNote.content.length"><font-awesome-icon :icon="['fas', 'floppy-disk']" />
                    Save</button>
                <button class="note-icon-button" @click="handleCancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.edit-note-background {
    position: absolute;
    width: 100%;
    height: 100%;
}

.edit-note-modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
    background-color: var(--white);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}



/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .edit-note-background {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(2px);
        z-index: 0;
    }

    .edit-note-modal {
        width: 500px;
        height: auto;
        padding: 2rem;
        border-radius: 8px;
        z-index: 10;
    }
}

.flex-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
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