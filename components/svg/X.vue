<script setup>
const props = defineProps({
    defineClass: String
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" :class="defineClass">
        <circle style="stroke-width:0px;fill:#000;" cx="16" cy="16" r="16"/>
        <path style="stroke-width:0px;fill:#fff;" d="M17.68,14.62l6.56-7.62h-1.55l-5.69,6.62-4.55-6.62h-5.24l6.88,10.01-6.88,7.99h1.55l6.01-6.99,4.8,6.99h5.24l-7.13-10.38h0ZM15.55,17.1l-.7-1-5.54-7.93h2.39l4.47,6.4.7,1,5.82,8.32h-2.39l-4.75-6.79h0Z"/>
    </svg>
</template>