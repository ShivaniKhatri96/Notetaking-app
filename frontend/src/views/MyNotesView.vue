<script setup>
import NoDataMessage from '../components/NoDataMessage.vue';
</script>
<template>
  <div class="my-notes">
    <NoDataMessage message="You haven't created notes yet" />
    <!-- <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="loading-icon"/> -->
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .my-notes {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 2rem;
    min-height: calc(100vh - var(--navbar-height));
  }
}
</style>
