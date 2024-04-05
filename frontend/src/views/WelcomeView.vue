<script setup>

</script>

<template>
    <main class="welcome-box">
        <div class="Noteworthy-box">
            <img alt="post-it picture" class="logo-icon" src="@/assets/logo.png" />
            <h1 class="welcome-title">Ready to embark on a note-taking journey? <br> Log in now to get started!</h1>
            <button>Log in</button>
        </div>
        <img alt="post-it picture" class="notes-image" src="@/assets/notes.png" />
    </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');

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

.logo-icon {
    width: 20rem;
}

.welcome-title {
    font-family: "Noto Serif", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings:
        "wdth" 100;
    font-weight: 600;
    font-size: 1.2rem;
}

.notes-image {
    width: 30rem;
}
</style>