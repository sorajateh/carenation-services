<script setup>
const props = defineProps({
    defineClass: String
})
</script>

<template>
    <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 19.5" :class="defineClass">
        <path style="stroke-linecap:round; stroke-linejoin:round;" d="M11.25,3.75H3c-1.24,0-2.25,1.01-2.25,2.25v10.5c0,1.24,1.01,2.25,2.25,2.25h10.5c1.24,0,2.25-1.01,2.25-2.25v-8.25M5.25,14.25L18.75.75M18.75.75h-5.25M18.75.75v5.25"/>
    </svg>
</template>