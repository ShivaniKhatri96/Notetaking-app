<script setup>

</script>

<template>
    <main class="welcome-box">
        <div class="Noteworthy-box">
            <img alt="post-it picture" class="logo" src="@/assets/logo.png" />
            <!-- <h1 class="title">Noteworthy</h1> -->
            <h2 class="sub-title">Ready to embark on a note-taking journey? <br> Log in now to get started!</h2>
            <button>Log in</button>
        </div>
        <img alt="post-it picture" class="notes" src="@/assets/notes.png" />
    </main>
</template>

<style scoped>
.welcome-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.Noteworthy-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.logo {
    width: 20rem;
}

/* .title {
    font-weight: 700;
    font-size: 2rem;
} */

.sub-title {
    font-weight: 600;
    font-size: 1rem;
}

.notes {
    width: 30rem;
}
</style>