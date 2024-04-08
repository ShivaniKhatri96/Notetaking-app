<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const { showMenu, menuX, menuY } = defineProps();
//defineEmits provides a way to define the events that components can trigger
const { emit } = defineEmits();

const handleActionClick = (action) => {
    emit('action-clicked', action);
}
 
</script>
<template>
    <div v-if="showMenu" class="context-menu" :style="{ top: `${menuY}px`, left: `${menuX}px` }">
        <slot></slot>
    </div>
</template>
<style scoped>
.context-menu {
    position: absolute;
    background-color: blue;
    padding: 0.5rem;
    z-index: 100;
}
</style>