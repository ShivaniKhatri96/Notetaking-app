<script setup>
</script>
<template>
    <div class="hamburger">
    </div>
</template>
<style scoped>
/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {
    .hamburger {
        position: relative;
        display: inline-block;
        width: 2.2rem;
        height: 0.2rem;
        /* margin-top: 1.1rem; */
        background-color: #000;
        transition: transform 0.4s ease-in-out;
    }

    .hamburger::before,
    .hamburger::after {
        content: "";
        position: absolute;
        display: inline-block;
        width: 2.2rem;
        height: 0.2rem;
        background-color: #000;
        transition: transform 0.4s ease-in-out;
    }

    .hamburger::before {
        top: -0.6rem;
        transform: rotate(0);
    }

    .hamburger::after {
        top: 0.6rem;
        transform: rotate(0);
    }

    .hamburger .hamburgerOn {
        background-color: red;
    }

    .hamburger .hamburgerOn::before {
        top: 0rem;
        transform: rotate(130deg);
    }

    .hamburger .hamburgerOn::after {
        top: 0rem;
        transform: rotate(-130deg);
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .hamburger {
        display: none;
    }
}
</style>