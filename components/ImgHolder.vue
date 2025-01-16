<script setup>
defineProps({
    src: String
})
</script>

<template>
    <div class="overflow-hidden rounded-2xl">
        <img v-if="src" class="w-full h-auto" :src="src" />
    </div>
</template>