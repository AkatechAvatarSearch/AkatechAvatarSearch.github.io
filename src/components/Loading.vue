<template>
    <div class="loading">
        <h2>Loading List...</h2>

        <progress :value="progress" max="100"></progress>

        <p>{{ progress }}%</p>
    </div>
</template>

<script setup>
defineProps({
    progress: Number
})
</script>

<style>
.loading {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 100svh;
}
</style>