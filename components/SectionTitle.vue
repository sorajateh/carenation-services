<script setup>
defineProps({
    title: String
})
</script>

<template>
    <h3 class="font-noto font-medium text-lg sm:text-3xl text-navy-700 pb-5 border-b border-grayscale-400 mb-5">
        {{ title }}
    </h3>
</template>