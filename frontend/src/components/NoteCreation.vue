<script setup>
import { ref } from "vue";
const isCreatingNote = ref(true);
const handleClick = () => {
    isCreatingNote 
}
const handleClickOutside = () => {
    console.log('clicked outside');
}
</script>
<template>
    <div class="create-wrapper">
        <div @click="handleClick" v-click-outside="handleClickOutside"e>click</div>
        <!-- <div v-if="isCreatingNote" v-click-away="onClickAway">show this</div> -->
    </div>
</template>
<style scoped>
.create-wrapper {
    display: flex;
    justify-content: center;
}
</style>