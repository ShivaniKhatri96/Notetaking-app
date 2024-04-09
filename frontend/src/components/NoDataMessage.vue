<script setup>
import { stringifyQuery } from 'vue-router';

defineProps({
    message: {
        type: stringifyQuery,
        required: true,
    }
})
</script>
<template>
    <div>
        <img alt="Image shown to represent no notes are present" class="chilling-girl"
            src="@/assets/girlChilling.png" />
        <p>{{ message }}</p>
    </div>
</template>
<style scoped>
.chilling-girl {
    width: 18rem;
}
</style>