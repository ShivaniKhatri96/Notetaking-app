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
.no-data-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.chilling-girl {
    width: 18rem;
}

.message-style {
    text-align: center;
}
</style>