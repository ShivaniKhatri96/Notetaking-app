<script setup>
import { ref, defineProps, defineEmits } from 'vue';
defineProps({
    showMenu: {
    type: Boolean,
    required: true
  }
});
// const { showMenu, menuX, menuY } = defineProps(['showMenu', 'menuX', 'menuY']);
//defineEmits provides a way to define the events that components can trigger
const { emit } = defineEmits();

// const handleActionClick = (action) => {
//     emit('action-clicked', action);
// }

// :style="{ top: `${menuY}px`, left: `${menuX}px` }"
</script>
<template>
    <div v-if="showMenu" class="context-menu" >
        <slot></slot>
    </div>
</template>
<style scoped>
.context-menu {
    position: fixed;
    top: 0;
    left: 0;
    background-color: blue;
    padding: 0.5rem;
    z-index: 10000;
}
</style>