<script setup>

</script>

<template>
    <main class="welcome-box">
        <img alt="post-it picture" class="notes" src="@/assets/notes.png" />
        <div>
            <h1>Noteworthy</h1>
           <p>Log in to create noteworthy Notes</p>
           <button>Log in</button>
        </div>
    </main>
</template>

<style scoped>
.welcome-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.notes {
    width: 30rem;
    /* width: 600px;
    height: 600px; */
}
</style>