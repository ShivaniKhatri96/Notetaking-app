<script setup>
defineProps({
    message: {
        type: String,
        required: true,
    }
})
</script>
<template>
    <div class="no-data-wrapper">
        <img alt="Image shown to represent no notes are present" class="chilling-girl"
            src="@/assets/girlChilling.png" />
        <p class="message-style"> {{ message }}. Create a new note to display here</p>
    </div>
</template>
<style scoped>

.chilling-girl {
    width: 14rem;
}

.message-style {
    text-align: center;
    font-size: 0.9rem;
}
</style>