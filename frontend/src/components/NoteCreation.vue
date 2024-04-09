<script setup>
import { ref } from "vue";

const isCreatingNote = ref(false);

const createNote = ref({
    title: '',
    content: ''
})
const handleClick = () => {
    isCreatingNote.value = true;
}
const handleClickOutside = () => {
    if (isCreatingNote.value === true) {
        isCreatingNote.value = false;
    }
}

const handleCreateNote = () => {
    const { title, content } = createNote.value;
    console.log('create note', title + ':' + content);
}

const cancelCreateNote = () => {
    isCreatingNote.value = false;
    console.log('cancel')
}

</script>
<template>
    <!-- using v-show because it doesn't work with v-if -->
    <!-- v-show keeps the element in the DOM. So, this works efficiently -->
    <div v-click-outside="handleClickOutside" class="create-wrapper" @click="handleClick">
        <input class="create-note-input" v-show="isCreatingNote" type="text" placeholder="Title"
            v-model="createNote.title" />
        <textarea class="create-note-input" :rows="isCreatingNote ? 8 : 1" cols placeholder="Take a note..."
            v-model="createNote.content"></textarea>
        <div v-show="isCreatingNote" class="button-container">
            <button  @click="cancelCreateNote">Cancel</button>
            <button class="btn green-btn" @click="handleCreateNote">Create</button>
        </div>
    </div>
</template>
<style scoped>
.create-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    background-color: var(--white);
    width: 40rem;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.create-note-input {
    width: 100%;
    border: none;
}

.create-note-input:focus {
    outline: none;
}

.button-container {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
}
</style>