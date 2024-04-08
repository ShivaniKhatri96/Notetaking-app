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
    position: absolute;
    background-color: var(--white);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 10000;
}
</style>