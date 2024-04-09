<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
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
        createNote.value.title = '';
        createNote.value.content = '';
    }
}

const handleCreateNote = async () => {
    const { title, content } = createNote.value;
    console.log(title);
    console.log('token', authStore.token);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authStore.token);
    try {
        const response = await fetch(
            "http://localhost:8000/api/notes",
            {
                method: "POST",
                body: JSON.stringify({
                    title,
                    content,
                }),
                headers: myHeaders,
            }
        );
        if (response.ok) {
            const data = await response.json();
            // isCreatingNote.value = false;
            console.log(data)
            console.log(response.status);
        }
    }
    catch (err) {
        console.log(err);
    };
}

const cancelCreateNote = () => {
    createNote.value.title = '';
    createNote.value.content = '';
    isCreatingNote.value = false;
}

</script>
<template>
    <!-- using v-show because it doesn't work with v-if -->
    <!-- v-show keeps the element in the DOM. So, this works efficiently -->
    <div v-click-outside="handleClickOutside" class="create-wrapper" :style="{ padding: isCreatingNote ? `1rem` : '' }">
        <input class="create-note-input" v-show="isCreatingNote" type="text" placeholder="Title"
            v-model="createNote.title" />
        <textarea @click="handleClick" class="create-note-input" :rows="isCreatingNote ? 8 : 1"
            placeholder="Take a note..." v-model="createNote.content"
            :style="{ padding: !isCreatingNote ? `1rem` : '' }"></textarea>
        <div v-show="isCreatingNote" class="button-container">
            <button class="btn black-btn" @click="cancelCreateNote">Cancel</button>
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
    width: 100%;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .create-wrapper {
        width: 40rem;
    }
}

.create-note-input {
    width: 100%;
    border: none;
    border-radius: 8px;
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