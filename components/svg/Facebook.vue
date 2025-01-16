<script setup>
const props = defineProps({
    defineClass: String
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" :class="defineClass">
        <path class="b" style="stroke-width:0px;fill:#1877f2;" d="M32,16C32,7.16,24.84,0,16,0S0,7.16,0,16c0,7.99,5.85,14.61,13.5,15.81v-11.18h-4.06v-4.62h4.06v-3.52c0-4.01,2.39-6.23,6.04-6.23,1.75,0,3.58.31,3.58.31v3.94h-2.02c-1.99,0-2.61,1.23-2.61,2.5v3h4.44l-.71,4.62h-3.73v11.18c7.65-1.2,13.5-7.82,13.5-15.81Z"/>
        <path class="c" style="stroke-width:0px;fill:#fff;" d="M22.23,20.62l.71-4.62h-4.44v-3c0-1.27.62-2.5,2.61-2.5h2.02v-3.94s-1.83-.31-3.58-.31c-3.65,0-6.04,2.22-6.04,6.23v3.52h-4.06v4.62h4.06v11.18c1.66.26,3.34.26,5,0v-11.18h3.73Z"/>
    </svg>
</template>