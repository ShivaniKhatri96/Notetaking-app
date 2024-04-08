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
    console.log('create note');
}

</script>
<template>
    <!-- using v-show because it doesn't work with v-if -->
    <!-- v-show keeps the element in the DOM. So, this works efficiently -->
    <div v-click-outside="handleClickOutside" class="create-wrapper" @click="handleClick">
        <div v-show="!isCreatingNote" class="divy">
            <input type="text" placeholder="Take a note..." v-model="createNote.content" />
        </div>
        <div v-show="isCreatingNote" class="divy">
            <input type="text" placeholder="Title" v-model="createNote.title" />
            <textarea rows="8" cols placeholder="Take a note..." v-model="createNote.content"></textarea>
            <div>
                <button>Cancel</button>
                <button @click="handleCreateNote">Create</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.create-wrapper {
    display: flex;
    gap: 5rem;
    justify-content: center;
    background-color: var(--white);
    width: 40rem;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.divy {
    /* padding: 1rem;
    background-color: aqua; */
}
</style>