<script setup>
const props = defineProps({
    defineClass: String
})
</script>

<template>
    <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" :class="defineClass">
        <circle class="b" style="stroke-width:0px;fill:red;" cx="16" cy="16" r="16"/>
        <path class="c" style="stroke-width:0px;fill:#fff;" d="M27,16s0,3.6-.46,5.33c-.25.95-1,1.7-1.95,1.96-1.72.46-8.6.46-8.6.46,0,0-6.88,0-8.6-.46-.95-.25-1.69-1-1.95-1.96-.46-1.73-.46-5.33-.46-5.33,0,0,0-3.6.46-5.33.25-.95,1-1.7,1.95-1.96,1.72-.46,8.6-.46,8.6-.46,0,0,6.88,0,8.6.46.95.25,1.69,1,1.95,1.96.46,1.73.46,5.33.46,5.33ZM13.75,19.27l5.75-3.27-5.75-3.27v6.54Z"/>
    </svg>
</template>