<script setup>
// import clickOutside from '../customDirective/clickOutside'; 
import { ref } from "vue";
const isCreatingNote = ref(false);
const handleClick = () => {
    isCreatingNote.value = true;
    console.log('ds', isCreatingNote.value)
}
const handleClickOutside = () => {
    if (isCreatingNote.value === true) {
        console.log('outside');
        isCreatingNote.value = false;
    }
}
</script>
<template>
    <div class="create-wrapper">
        <div v-click-outside="handleClickOutside" class="create-wrapper">
            <!-- using v-show because it doesn't work with v-if -->
            <!-- v-show keeps the element in the DOM. So, this works efficiently -->
            <div v-show="!isCreatingNote" @click="handleClick" class="divy">create</div>
            <div v-show="isCreatingNote" class="divy">show</div>
        </div>
    </div>
</template>
<style scoped>
.create-wrapper {
    display: flex;
    gap: 5rem;
    justify-content: center;
}

.divy {
    padding: 1rem;
    background-color: aqua;
}
</style>