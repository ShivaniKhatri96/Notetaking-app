<script setup>
import { ref, defineProps, defineEmits } from 'vue';
defineProps({
    showMenu: {
        type: Boolean,
        required: true
    },
    menuX: {
        type: Number,
        required: true
    },
    menuY: {
        type: Number,
        required: true
    },
});
//defineEmits provides a way to define the events that components can trigger
const { emit } = defineEmits();

// const handleActionClick = (action) => {
//     emit('action-clicked', action);
// }

</script>
<template>
    <div v-if="showMenu" class="context-menu" :style="{ top: `${menuY}px`, left: `${menuX}px` }">
        <slot></slot>
    </div>
</template>
<style scoped>
.context-menu {
    /* position: fixed;
    top: 0;
    left: 0; */
    position: absolute;
    background-color: blue;
    padding: 0.5rem;
    z-index: 10000;
}
</style>